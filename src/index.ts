import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./database/db";
import { handleGracefulShutdown } from "./shutdown";
import { DataTypes, Sequelize } from "sequelize";
import bodyParser from "body-parser";
import MembersModel from "./database/models/members.model";

dotenv.config();

const app: Express = express();

// Middleware
app.use(bodyParser.json());

const port = process.env.PORT || 3000;
console.log("connecting to DB...");
const dbres = connectToDatabase();
export const database: Sequelize = dbres.sequelize;
//
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port} ⚡`);
});

//-------------------------------USERS----------------------------------------------
//get all users
app.get("/api/users", async (req: Request, res: Response) => {
  try {
    const users = await dbres.models.User.findAll();
    res.status(200).json(users);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
//create a user
app.post("/api/users", async (req, res) => {
  try {
    const requestedUser = req.body;
    const newUser = await dbres.models.User.create(requestedUser);
    res.status(200).json(newUser);
  } catch (error: any) {
    if (error.name === "SequelizeUniqueConstraintError") {
      // If the error is due to a unique constraint (duplicate username)
      return res.status(409).json({
        error: "Username conflict",
        status: 409,
        message:
          "The requested username is already in use. Please choose a different username.",
      });
    }
    // Handle other errors
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// ---------------------------------- TEAMS -------------------------------------------------
//get all teams
app.get("/api/teams", async (req: Request, res: Response) => {
  try {
    const teams = await dbres.models.Team.findAll({
      include: [
        {
          model: dbres.models.Member,
          include: [
            {
              model: dbres.models.User,
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
app.post("/api/teams", async (req: Request, res: Response) => {
  try {
    const requested_team = req.body;
    console.log("---");
    console.log(requested_team);
    const new_team = await dbres.models.Team.create(requested_team);
    res.status(200).json(new_team);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// ---------------------------------- MEMBERS -------------------------------------------------

app.post("/api/members", async (req: Request, res: Response) => {
  try {
    const requested_member = req.body;
    console.log("---");
    console.log(requested_member);
    const new_member = await dbres.models.Member.create(requested_member);
    res.status(200).json(new_member);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
