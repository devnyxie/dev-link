import express, { Express, Request, Response } from "express";
import { Request as RequestModel } from "../database/db";
const requestsRouter = express.Router();

requestsRouter.post("/api/requests", async (req: Request, res: Response) => {
  try {
    const requested_request = req.body;
    const new_request = await RequestModel.create(requested_request);
    res.status(200).json(new_request);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

export default requestsRouter;
