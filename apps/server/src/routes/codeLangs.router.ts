import express from "express";
import { verifyRefreshToken, signToken } from "../utils/auth";
import { CodeLangs, Team } from "../database/db";
import { Sequelize } from "sequelize";
import TeamModel from "../database/models/team.model";
import { TeamCodeLangs } from "../database/db";
import { Op } from "sequelize";
const codeLangsRouter = express.Router();

//get endpoint to get all TeamCodeLangs
codeLangsRouter.get("/api/teamCodeLangs", async (req, res) => {
  try {
    const codeLangs = await TeamCodeLangs.findAll({
      limit: 10,
      offset: 0,
      include: [{ model: CodeLangs, attributes: ["id", "name"] }],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(codeLangs);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error.");
  }
});

codeLangsRouter.get("/api/trendingTechnologies", async (req, res) => {
  try {
    /**
     * teamCodeLangs is a join table between teams and codeLangs. This endpoint retrieves the top 10 code languages along with their count of occurrences.
     * @returns {Promise<Array<{ codeLangId: number, count: number, CodeLang: { id: number, name: string } }>>} The array of code languages with their count of occurrences.
     */
    const codeLangs = await TeamCodeLangs.findAll({
      attributes: [
        "codeLangId",
        [Sequelize.fn("COUNT", "codeLangId"), "count"],
      ],
      group: ["codeLang.id", "codeLangId"],
      order: [[Sequelize.fn("COUNT", "codeLangId"), "DESC"]],
      limit: 15,
      include: [{ model: CodeLangs, attributes: ["id", "name"] }],
    });

    res.status(200).json(codeLangs);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error.");
  }
});

export default codeLangsRouter;
