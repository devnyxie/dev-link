import express, { Express, Request, Response } from "express";
import {
  Member,
  Request as RequestModel,
  Team,
  User,
  database,
} from "../database/db";
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
      ],
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
    let requested_members = req.body.members;
    try {
      const result = await database.transaction(async (t) => {
        const team = await Team.create(requested_team, { transaction: t });
        // let's add team_id to each member.
        await requested_members.forEach((member: any) => {
          member["team_id"] = team.id;
        });
        // create members
        const members = await Member.bulkCreate(requested_members, {
          transaction: t,
        });
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
