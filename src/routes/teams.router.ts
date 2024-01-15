import express, { Express, Request, Response } from "express";
import { database } from "..";
import { Team } from "../database/db";
const router = express.Router();

router.get("/api/teams", async (req: Request, res: Response) => {
  try {
    const teams = await Team.findAll({
      include: [
        {
          model: database.models.Member,
          include: [
            {
              model: database.models.User,
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

//create a team
//1. create a team
//2. create all members (leader from creator_id + all selected roles without user_id)
router.post("/api/teams", async (req: Request, res: Response) => {
  try {
    const requested_team = req.body;
    console.log("---");
    console.log(requested_team);
    const new_team = await Team.create(requested_team);
    res.status(200).json(new_team);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
