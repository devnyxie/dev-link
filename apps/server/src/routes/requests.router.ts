import express, { Express, Request, Response } from "express";
import { Member, Request as RequestModel, database } from "../database/db";
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
      //
      if (request) {
        const user_id: string = request?.user_id;
        const member_id: string = request?.member_id;
        const result = await database.transaction(async (t) => {
          let member_res;
          async function adjustMember() {
            const [affectedCount_member] = await Member.update(
              { user_id: user_id },
              {
                where: {
                  id: member_id,
                },
                transaction: t,
              }
            );
            return affectedCount_member;
          }
          const affectedCount_request = await RequestModel.destroy({
            where: { id: request_id },
          });
          if (decision == true) {
            member_res = await adjustMember();
          }
          if (affectedCount_request !== 0 && member_res !== 0) {
            return;
          } else {
            throw new Error("");
          }
        });
        //

        res
          .status(200)
          .json(
            `User request was successfully ${
              decision ? "accepted." : "declined."
            }`
          );
      }
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).send("Internal Server Error.");
    }
  }
);

requestsRouter.delete(
  "/api/request/:request_id",
  async (req: Request, res: Response) => {
    try {
      const { request_id } = req.params;
      const response = await RequestModel.destroy({
        where: { id: request_id },
      });
      res.status(200).json(response);
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).send("Internal Server Error.");
    }
  }
);

export default requestsRouter;
