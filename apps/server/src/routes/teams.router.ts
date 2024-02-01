import express, { Express, Request, Response } from "express";
import {
  Member,
  Request as RequestModel,
  Team,
  User,
  database,
} from "../database/db";
import { CodeLangs } from "../database/db";

const teamsRouter = express.Router();

teamsRouter.get("/api/teams", async (req: Request, res: Response) => {
  try {
    const teams = await Team.findAll({
      include: [
        {
          model: Member,
          attributes: ["id", "role"],
          include: [
            {
              model: User,
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
          model: CodeLangs,
          // as: "teamLanguages",
          through: { attributes: [] },
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json(teams);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Expected input:
// {
//   team: {},
//   members: { including the creator_id }
// }
teamsRouter.post("/api/teams", async (req: Request, res: Response) => {
  try {
    const requested_team = req.body.team;
    const requested_members = req.body.members;
    const requested_languages = req.body.languages;
    try {
      const result = await database.transaction(async (t) => {
        console.log("Creating team...");
        const team = await Team.create(requested_team, { transaction: t });
        // let's add team_id to each member.
        await requested_members.forEach((member: any) => {
          member["team_id"] = team.id;
        });
        // create members
        console.log("Creating members...");
        const members = await Member.bulkCreate(requested_members, {
          transaction: t,
        });
        // --- Languages ---
        console.log("Languages check...");
        if (requested_languages && requested_languages.length > 0) {
          // create languages
          console.log("Creating languages...");
          try {
            const languages = requested_languages.map((name: string) => ({
              name,
            }));
            const languageInstances = await CodeLangs.bulkCreate(languages, {
              updateOnDuplicate: ["name"],
              transaction: t,
            });
            // mapping ids of created languages
            console.log(languageInstances);
            const languageIds = languageInstances.map(
              (language) => language.id
            );
            console.log(languageIds);

            // Add the languages to the team
            console.log("Adding languages to team...");

            await team.addCodeLangs(languageIds, { transaction: t });
          } catch (error) {
            console.log(error);
            throw new Error();
          }
        }

        if (team && members) {
          return team;
        } else {
          throw new Error();
        }
        //just redirect user to /teams/id :)
      });
      res.status(200).json(result);
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

export default teamsRouter;
