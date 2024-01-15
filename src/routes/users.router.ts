import express, { Express, Request, Response } from "express";
import { database } from "..";
import UserModel from "../database/models/user.model";
import { User } from "../database/db";

const router = express.Router();

// GET all users
router.get("/api/users", async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// POST a new user
router.post("/api/users", async (req, res) => {
  try {
    const requestedUser = req.body;
    const newUser = await User.create(requestedUser);
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

export default router;
