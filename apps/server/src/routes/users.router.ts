import express, { Express, Request, Response } from "express";
import { User } from "../database/db";
import { handleResponse } from "./utils";

const usersRouter = express.Router();

// Get all users
usersRouter.get("/api/users", async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Create user
usersRouter.post("/api/users", async (req, res) => {
  try {
    const requestedUser = req.body;
    const newUser = await User.create(requestedUser);
    res.status(200).json(newUser);
  } catch (error: any) {
    if (error.name === "SequelizeUniqueConstraintError") {
      // (duplicate username)
      return res.status(409).json({
        message:
          "The requested username is already in use. Please choose a different username.",
      });
    }
    // Handle other errors
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Update user
usersRouter.put("/api/users/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const updated_data = req.body;
    const [affectedCount]: [number] = await User.update(updated_data, {
      where: {
        id: user_id,
      },
    });
    handleResponse({
      res,
      response: affectedCount,
      expectedValue: 1,
      successMessage: "User data was successfully updated.",
      errorMessage: "An error occured. No changes were made.",
    });
  } catch (error: any) {
    // Handle other errors
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Delete user
usersRouter.delete("/api/users/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const response = await User.destroy({
      where: {
        id: user_id,
      },
    });
    handleResponse({
      res,
      response,
      expectedValue: 1,
      successMessage: "User was successfully deleted.",
      errorMessage: "An error occured. User was not deleted.",
    });
  } catch (error: any) {
    // Handle other errors
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

export default usersRouter;
