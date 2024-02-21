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
        include: [
          {
            model: User,
            attributes: ["id", "username", "pfp"],
          },
          {
            model: Member,
            attributes: ["id", "role"],
          },
          {
            model: Team,
            attributes: ["id", "name"],
          },
        ],
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
      const accepted: string = req.body.accepted;
      console.log("User was accepted?", accepted);
      console.log(req.body);
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

          if (accepted === "false") {
            return affectedCount_request;
          }
          const affectedCount_member = await adjustMember();
          console.log("affectedCount_member", affectedCount_member);
          if (affectedCount_member) {
            return affectedCount_member;
          } else {
            throw new Error("");
          }
        });
        //
        if (result) {
          res.status(200).json({
            message: `User was successfully ${
              accepted === "true" ? "accepted" : "rejected"
            }.`,
          });
        } else {
          res.status(500).send({ message: "Internal Server Error." });
        }
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
