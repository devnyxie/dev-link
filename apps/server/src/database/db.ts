import { Sequelize } from "sequelize";
import UserModel from "./models/user.model"; // Assuming UserModel is the exported model definition
import TeamModel from "./models/team.model";
import MembersModel from "./models/members.model";
import RequestsModel from "./models/requests.model";
import LanguagesModel from "./models/languages.model";

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
const sequelize: Sequelize = new Sequelize(process.env.DB_URL);
// test
syncDatabase(sequelize);
// associations
// LanguagesModel(sequelize).belongsToMany(TeamModel(sequelize), {
//   through: "TeamLanguages",
// });
// TeamModel(sequelize).belongsToMany(LanguagesModel(sequelize), {
//   through: "TeamLanguages",
// });
// export
export const { database, User, Team, Member, Request, Languages } = {
  database: sequelize,
  User: UserModel(sequelize),
  Team: TeamModel(sequelize),
  Member: MembersModel(sequelize),
  Request: RequestsModel(sequelize),
  Languages: LanguagesModel(sequelize),
};
