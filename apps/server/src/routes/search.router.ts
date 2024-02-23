import express from "express";
import {
  CodeLangs,
  Member,
  Request as RequestModel,
  Team,
  TeamCodeLangs,
  User,
} from "../database/db";
import { Op, Sequelize } from "sequelize";
import codeLangsRouter from "./codeLangs.router";
import { Request, Response } from "express";
import { setupRoles } from "../utils";

const searchRouter = express.Router();

//get technologies
searchRouter.get(
  "/technologies/search/:name",
  async (req: Request, res: Response) => {
    try {
      const query = req.params.name;
      const limit = req.query.limit ? Number(req.query.limit) : 10;
      const technologies = await TeamCodeLangs.findAll({
        attributes: [
          "codeLangId",
          [Sequelize.fn("COUNT", "codeLangId"), "count"],
        ],
        group: ["codeLang.id", "codeLangId"],
        order: [[Sequelize.fn("COUNT", "codeLangId"), "DESC"]],
        limit: limit,
        include: [
          {
            model: CodeLangs,
            attributes: ["id", "name"],
            where: {
              name: {
                [Op.iLike]: `%${query}%`,
              },
            },
          },
        ],
      });
      res.status(200).json(technologies);
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

//search for teams
searchRouter.get("/teams/search/:name", async (req: Request, res: Response) => {
  try {
    const name = req.params.name;
    const limit = req.query.limit ? Number(req.query.limit) : 10;
    const offset = req.query.offset ? Number(req.query.offset) : undefined;
    const teams = await Team.findAll({
      order: [["createdAt", "DESC"]],
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      limit: limit,
      offset: offset,
      include: [
        {
          model: Member,
          attributes: ["id", "role", "createdAt"],
          include: [
            {
              model: User,
              attributes: ["id", "username", "pfp"],
            },
            {
              model: RequestModel,
              attributes: ["id", "accepted", "createdAt", "updatedAt"],
              include: [
                {
                  model: User,
                  attributes: ["id", "username", "pfp"],
                },
              ],
            },
          ],
        },
        {
          model: User,
          as: "creator",
          attributes: ["username", "pfp"],
        },
        {
          model: CodeLangs,
          // as: "teamLanguages",1
          attributes: ["name"],
          through: { attributes: [] },
          as: "codeLangs", // Change column name to "programming_languages"
        },
      ],
    });
    const teamsWithRoles = setupRoles(teams);
    res.status(200).json(teamsWithRoles);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//search for users
searchRouter.get("/users/search/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const limit = req.query.limit ? Number(req.query.limit) : 10;
    const offset = req.query.offset ? Number(req.query.offset) : undefined;
    const users = await User.findAll({
      where: {
        username: {
          [Op.iLike]: `%${username}%`,
        },
      },
      limit: limit,
      offset: offset,
    });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//get all
searchRouter.get("/quicksearch/:query", async (req, res) => {
  try {
    const query = req.params.query;
    const limit = 3;

    const teams = await Team.findAll({
      where: {
        name: {
          [Op.iLike]: `%${query}%`,
        },
      },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
          as: "creator",
          attributes: ["username", "pfp"],
        },
      ],
      limit: limit,
    });

    const users = await User.findAll({
      where: {
        username: {
          [Op.iLike]: `%${query}%`,
        },
      },
      limit: limit,
    });

    const technologies = await TeamCodeLangs.findAll({
      attributes: [
        "codeLangId",
        [Sequelize.fn("COUNT", "codeLangId"), "count"],
      ],
      group: ["codeLang.id", "codeLangId"],
      order: [[Sequelize.fn("COUNT", "codeLangId"), "DESC"]],
      limit: limit,
      include: [
        {
          model: CodeLangs,
          attributes: ["id", "name"],
          where: {
            name: {
              [Op.iLike]: `%${query}%`,
            },
          },
        },
      ],
    });

    res.status(200).json({ teams, users, technologies });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

searchRouter.get(
  "/teams/search/technology/:codeLangName",
  async (req: Request, res: Response) => {
    const { codeLangName } = req.params;

    try {
      const teams = await Team.findAll({
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: Member,
            attributes: ["id", "role", "createdAt"],
            include: [
              {
                model: User,
                attributes: ["id", "username", "pfp"],
              },
              {
                model: RequestModel,
                attributes: ["id", "accepted", "createdAt", "updatedAt"],
                include: [
                  {
                    model: User,
                    attributes: ["id", "username", "pfp"],
                  },
                ],
              },
            ],
          },
          {
            model: User,
            as: "creator",
            attributes: ["username", "pfp"],
          },
          {
            model: CodeLangs,
            attributes: ["id", "name"],
            through: { attributes: [] },
            as: "codeLangs",
            where: {
              name: {
                [Op.iLike]: `${codeLangName}`,
              },
            },
          },
        ],
      });
      const teamsWithRoles = setupRoles(teams);
      res.status(200).json(teamsWithRoles);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

export default searchRouter;
