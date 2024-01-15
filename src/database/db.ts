import { Sequelize } from "sequelize";
import UserModel from "./models/user.model"; // Assuming UserModel is the exported model definition
import TeamModel from "./models/team.model";
import MembersModel from "./models/members.model";

async function testDatabase(database: Sequelize) {
  try {
    await database.authenticate();
    // await database.sync({ force: true });
    await database.sync({ alter: true });
    // await database.sync();
    console.log(
      "[testDatabase]: Database connection has been established successfully ⚡"
    );
  } catch (error) {
    throw new Error(
      `[testDatabase]: Unable to connect to the database. Error: ${error}`
    );
  }
}

// export function connectToDatabase(): { sequelize: Sequelize; models: any } {
//   if (!process.env.DB_URL) {
//     throw new Error(
//       "DB_URL is not defined. Please provide a valid database URL."
//     );
//   }

//   const sequelize: Sequelize = new Sequelize(process.env.DB_URL);

//   const models = {
//     User: UserModel(sequelize),
//     Team: TeamModel(sequelize),
//     Member: MembersModel(sequelize),
//   };

//   testDatabase(sequelize);

// interface Database {
//   sequelize: Sequelize;
//   models: {
//     User: typeof UserModel(sequelize);
//     Team: typeof TeamModel(sequelize);
//     Member: typeof MembersModel(sequelize);
//   };
// }

// const result: Database = {
//   sequelize: sequelize,
//   models
//   // other properties
// };

//   return { sequelize, models };
// }

if (!process.env.DB_URL) {
  throw new Error(
    "DB_URL is not defined. Please provide a valid database URL."
  );
}
// init
const sequelize: Sequelize = new Sequelize(process.env.DB_URL);
// test
testDatabase(sequelize);
// export
export const { database, User, Team, Member } = {
  database: sequelize,
  User: UserModel(sequelize),
  Team: TeamModel(sequelize),
  Member: MembersModel(sequelize),
};
