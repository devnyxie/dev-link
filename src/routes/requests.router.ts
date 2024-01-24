import express, { Express, Request, Response } from "express";
import { Member, Request as RequestModel } from "../database/db";
import { DataTypes } from "sequelize";
const requestsRouter = express.Router();

requestsRouter.post("/api/request", async (req: Request, res: Response) => {
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

// manage request (accept/deny)
// expected request:
// {
//   token: token (to-do);
//   accepted: true/false;
// }
requestsRouter.put(
  "/api/request/:request_id",
  async (req: Request, res: Response) => {
    try {
      const decision: boolean = req.body.accepted;
      const { request_id } = req.params;
      //get the request itself
      const request = await RequestModel.findByPk(request_id);
      if (request?.accepted == null) {
        const [affectedCount]: [number] = await RequestModel.update(
          { accepted: decision },
          {
            where: {
              id: request_id,
            },
          }
        );
      }

      // handleResponse({
      //   res,
      //   response: affectedCount,
      //   expectedValue: 1,
      //   successMessage: "User data was successfully updated.",
      //   errorMessage: "An error occured. No changes were made.",
      // });
      // res.status(200).json(new_request);
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

export default requestsRouter;
