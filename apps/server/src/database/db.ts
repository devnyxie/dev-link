import { Sequelize } from "sequelize";
import UserModel from "./models/user.model"; // Assuming UserModel is the exported model definition
import TeamModel from "./models/team.model";
import MembersModel from "./models/members.model";
import RequestsModel from "./models/requests.model";
import CodeLangsModel from "./models/codeLangs.model";
import teamCodeLangs from "./models/teamCodeLangs.model";

async function syncDatabase(database: Sequelize) {
  try {
    await database.authenticate();
    // await database.sync({ force: true });
    await database.sync({ alter: true });
    // await database.sync();
    console.log(
      "[syncDatabase]: Database connection has been established successfully ⚡"
    );
  } catch (error) {
    throw new Error(
      `[syncDatabase]: Unable to connect to the database. Error: ${error}`
    );
  }
}

if (!process.env.DB_URL) {
  throw new Error(
    "DB_URL is not defined. Please provide a valid database URL."
  );
}

// init
const sequelize: Sequelize = new Sequelize(process.env.DB_URL, {
  logging: false,
});
// test
syncDatabase(sequelize);

// export
export const {
  database,
  User,
  Team,
  Member,
  Request,
  CodeLangs,
  TeamCodeLangs,
} = {
  database: sequelize,
  User: UserModel(sequelize),
  Team: TeamModel(sequelize),
  Member: MembersModel(sequelize),
  Request: RequestsModel(sequelize),
  CodeLangs: CodeLangsModel(sequelize),
  TeamCodeLangs: teamCodeLangs(sequelize),
};

// --- associtaions ---

//Teams
Team.belongsToMany(CodeLangs, {
  through: "teamCodeLangs",
  as: "codeLangs",
  foreignKey: "teamId",
  otherKey: "codeLangId",
});
Team.belongsTo(User, {
  foreignKey: "creator_id",
  as: "creator",
});
Team.hasMany(Member, { foreignKey: "team_id" });
Team.hasMany(Request, { foreignKey: "team_id" });

//CodeLangs
CodeLangs.belongsToMany(Team, {
  through: "teamCodeLangs",
  foreignKey: "codeLangId",
  otherKey: "teamId",
});
//TeamCodeLangs
TeamCodeLangs.belongsTo(CodeLangs, { foreignKey: "codeLangId" });
CodeLangs.hasMany(TeamCodeLangs, { foreignKey: "codeLangId" });

//Users
User.hasMany(Team, {
  foreignKey: "creator_id",
  as: "teams",
});

//Members
Member.belongsTo(User, { foreignKey: "user_id" });
Member.hasMany(Request, { foreignKey: "member_id" });
