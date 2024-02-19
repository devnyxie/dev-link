import express, { Express, Request, Response } from "express";
import {
  Member,
  Request as RequestModel,
  Team,
  User,
  database,
} from "../database/db";
import { DataTypes } from "sequelize";
const requestsRouter = express.Router();

//get all requests of all teams for a creator
requestsRouter.get(
  "/api/requests/creator/:creator_id",
  async (req: Request, res: Response) => {
    try {
      const { creator_id } = req.params;

      const teams = await Team.findAll({
        where: { creator_id },
        attributes: ["id"],
      });
      console.log(teams.length);

      const teamIds = teams.map((team) => team.id);

      const requests = await RequestModel.findAll({
        order: [["createdAt", "DESC"]],
        where: { team_id: teamIds },
      });

      res.status(200).json(requests);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error.");
    }
  }
);

requestsRouter.get(
  "/api/requests/user/:id",
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const requests = await RequestModel.findAll({
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: Team,
            attributes: ["id", "name"],
          },
          { model: Member, attributes: ["role"] },
        ],
        where: { user_id: id },
      });

      res.status(200).json(requests);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error.");
    }
  }
);

requestsRouter.post("/api/requests", async (req: Request, res: Response) => {
  try {
    const requested_request = req.body;
    const new_request = await RequestModel.create(requested_request);
    const requestWithUser = await RequestModel.findOne({
      where: { id: new_request.id },
      include: [User],
    });
    if (requestWithUser || new_request) {
      res.status(200).json({
        message: "Your request was successfully created",
        data: requestWithUser || new_request,
      });
    }
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

requestsRouter.put(
  "/api/requests/:request_id",
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
  "/api/requests/:request_id",
  async (req: Request, res: Response) => {
    try {
      const { request_id } = req.params;
      const response = await RequestModel.destroy({
        where: { id: request_id },
      });
      res
        .status(200)
        .json({ data: response, message: "Request was successfully deleted." });
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).send("Internal Server Error.");
    }
  }
);

export default requestsRouter;
