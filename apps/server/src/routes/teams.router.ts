import express, { Express, Request, Response } from "express";
import {
  Member,
  Request as RequestModel,
  Team,
  User,
  database,
} from "../database/db";
import { CodeLangs } from "../database/db";
import { Op } from "sequelize";

const teamsRouter = express.Router();

function setupRoles(teams: any) {
  const teamsWithRoles = teams.map((team: any) => {
    const { members, ...teamWithoutMembers } = team.toJSON();
    const openRoles = members.filter((member: any) => !member.user);
    const takenRoles = members.filter((member: any) => member.user);
    return {
      ...teamWithoutMembers,
      openRoles: openRoles,
      takenRoles: takenRoles,
    };
  });
  return teamsWithRoles;
}

//get
teamsRouter.get("/api/teams", async (req: Request, res: Response) => {
  try {
    const limit = req.query.limit ? Number(req.query.limit) : undefined;
    const offset = req.query.offset ? Number(req.query.offset) : undefined;
    const teams = await Team.findAll({
      order: [["createdAt", "DESC"]],
      limit: limit,
      offset: offset,
      include: [
        {
          model: Member,
          attributes: ["id", "role", "createdAt"],
          include: [
            {
              model: User,
              attributes: ["id", "username", "pfp"],
            },
            {
              model: RequestModel,
              attributes: ["id", "accepted", "createdAt", "updatedAt"],
              include: [
                {
                  model: User,
                  attributes: ["id", "username", "pfp"],
                },
              ],
            },
          ],
        },
        {
          model: User,
          as: "creator",
          attributes: ["username", "pfp"],
        },
        {
          model: CodeLangs,
          // as: "teamLanguages",1
          attributes: ["name"],
          through: { attributes: [] },
          as: "codeLangs", // Change column name to "programming_languages"
        },
      ],
    });

    const teamsWithRoles = setupRoles(teams);
    const teamsCount = await Team.count();
    res.status(200).json({ teams: teamsWithRoles, count: teamsCount });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//get one
teamsRouter.get("/api/teams/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const team = await Team.findByPk(id, {
      include: [
        {
          model: Member,
          attributes: ["id", "role", "createdAt"],

          include: [
            {
              model: User,
              attributes: ["id", "username", "pfp"],
            },
            {
              model: RequestModel,
              attributes: ["id", "accepted", "createdAt", "updatedAt"],
              include: [
                {
                  model: User,
                  attributes: ["id", "username", "pfp"],
                },
              ],
            },
          ],
        },
        {
          model: User,
          as: "creator",
          attributes: ["username", "pfp"],
        },
        {
          model: CodeLangs,
          attributes: ["name"],
          through: { attributes: [] },
          as: "codeLangs",
        },
      ],
    });
    if (team) {
      const teamWithRoles = setupRoles([team]);
      res.json(teamWithRoles[0]);
    } else {
      res.status(404).send({ message: "Team was not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "An error occured" });
  }
});

//post
teamsRouter.post("/api/teams", async (req: Request, res: Response) => {
  try {
    const requested_team = req.body.team;
    const requested_members = req.body.members;
    const requested_languages = req.body.languages;
    try {
      const result = await database.transaction(async (t) => {
        //
        //
        try {
          console.log("Creating team...");
          const team = await Team.create(requested_team, { transaction: t });

          // --- Members ---
          if (requested_members && requested_members.length > 0) {
            // let's add team_id to each member.
            await requested_members.forEach((member: any) => {
              member["team_id"] = team.id;
            });
            // create members
            console.log("Creating members...");
            await Member.bulkCreate(requested_members, {
              transaction: t,
            });
          }
          // --- Languages ---
          console.log("Languages check...");
          if (requested_languages && requested_languages.length > 0) {
            // create languages
            console.log("Creating languages...");
            try {
              //array of all langs
              let languages = requested_languages.map((name: string) => ({
                name,
              }));
              console.log("------------------- requested_langs: ", languages);
              //check if they already exist in DB
              let languagesFromDB = await CodeLangs.findAll({
                where: {
                  name: requested_languages,
                },
              });
              console.log("------------------- db langs: ", languagesFromDB);

              //filter out the ones that already exist
              languages = languages.filter((language: any) => {
                return !languagesFromDB.some(
                  (lang) => lang.name === language.name
                );
              });
              console.log("------------------- langs to create: ", languages);

              const languageInstances = await CodeLangs.bulkCreate(languages, {
                updateOnDuplicate: ["name"],
                transaction: t,
              });
              // mapping ids of created languages
              const languageIds = languageInstances.map(
                (language) => language.id
              );
              //add ids of already existing languages
              languagesFromDB.forEach((lang: any) => {
                languageIds.push(lang.id);
              });
              console.log(
                "------------------- ids to add to the team: ",
                languageIds
              );

              // Add the languages to the team
              console.log("Adding languages to team...");
              await team.addCodeLangs(languageIds, { transaction: t });
            } catch (error) {
              console.log(error);
              throw new Error();
            }
          }

          if (team) {
            return team;
          } else {
            throw new Error();
          }
        } catch (error) {
          console.log(error);
          throw new Error();
        }
        //
        //

        //just redirect user to /teams/id :)
      });
      res
        .status(200)
        .json({ team: result, message: "Team created successfully" });
    } catch (error) {
      res.status(400).json({
        message:
          "An error occurred while creating your team! Please try again.",
      });
    }
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//get all teams where creator_id = :id and :id is in members of the team
teamsRouter.get("/api/teams/user/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const limit = req.query.limit ? Number(req.query.limit) : undefined;
    const offset = req.query.offset ? Number(req.query.offset) : undefined;

    //
    //
    const teamIds = await Member.findAll({
      order: [["createdAt", "DESC"]],
      where: {
        user_id: id,
      },
      attributes: ["team_id"],
      limit: limit,
      offset: offset,
    });

    const usersTeams = await Team.findAll({
      order: [["createdAt", "DESC"]],
      where: {
        id: {
          [Op.in]: teamIds.map((team) => team.team_id),
        },
      },
      include: [
        {
          model: Member,
          attributes: ["id", "role"],
          include: [
            {
              model: User,
              attributes: ["id", "username", "pfp"],
            },
            {
              model: RequestModel,
              attributes: ["id", "accepted", "createdAt", "updatedAt"],
              include: [
                {
                  model: User,
                  attributes: ["id", "username", "pfp"],
                },
              ],
            },
          ],
        },
        {
          model: User,
          as: "creator",
          attributes: ["username", "pfp"],
        },
        {
          model: CodeLangs,
          // as: "teamLanguages",1
          attributes: ["name"],
          through: { attributes: [] },
          as: "codeLangs", // Change column name to "programming_languages"
        },
      ],
    });
    //
    //

    const teamsWithRoles = setupRoles(usersTeams);
    res.status(200).json(teamsWithRoles);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

export default teamsRouter;
