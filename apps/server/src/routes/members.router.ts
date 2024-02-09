import express, { Express, Request, Response } from "express";
import { Member } from "../database/db";
const membersRouter = express.Router();

// single member creation
membersRouter.post("/api/member", async (req: Request, res: Response) => {
  try {
    const requested_member = req.body;
    const new_member = await Member.create(requested_member);
    res.status(200).json(new_member);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//
membersRouter.post("/api/members", async (req: Request, res: Response) => {
  try {
    const requested_members = req.body;
    const members = await Member.bulkCreate(requested_members);
    res.status(200).json(members);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

membersRouter.put(
  "/api/member/:member_id",
  async (req: Request, res: Response) => {
    try {
      const requested_changes = req.body;
      const { member_id } = req.params;
      const [affectedCount_member] = await Member.update(requested_changes, {
        where: {
          id: member_id,
        },
      });
      if (affectedCount_member === 1) {
        res.status(200).json("Member changed successfully.");
      }
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

export default membersRouter;
