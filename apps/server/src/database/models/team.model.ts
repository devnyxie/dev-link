import { DataTypes, Model, Sequelize } from "sequelize";
import bcrypt from "bcrypt";
import MembersModel from "./members.model";
import UserModel from "./user.model";
import RequestsModel from "./requests.model";
import ProgrammingLanguagesModel, {
  ProgrammingLanguagesInstance,
} from "./programmingLanguages.model";
import { BelongsToManyAddAssociationsMixin } from "sequelize/types";

interface TeamAttributes {
  id: string;
  creator_id: string;
  name: string;
  description: string;
  // languages: Array<string>;
}

interface TeamCreationAttributes extends TeamAttributes {}

interface TeamInstance
  extends Model<TeamAttributes, TeamCreationAttributes>,
    TeamAttributes {
  addProgrammingLanguages: BelongsToManyAddAssociationsMixin<
    ProgrammingLanguagesInstance,
    ProgrammingLanguagesInstance["id"]
  >;
}

const TeamModel = (sequelize: Sequelize) => {
  const Team = sequelize.define<TeamInstance>(
    "team",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
      },
      creator_id: {
        allowNull: false,
        type: DataTypes.UUID,
        onDelete: "CASCADE",
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      description: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      // languages: {
      //   allowNull: true,
      //   type: DataTypes.ARRAY(DataTypes.STRING),
      // },
    },
    {
      timestamps: true,
    }
  );
  try {
    Team.hasMany(MembersModel(sequelize), { foreignKey: "team_id" });
    Team.hasMany(RequestsModel(sequelize), { foreignKey: "team_id" });
    Team.belongsTo(UserModel(sequelize), { foreignKey: "creator_id" });
    //
  } catch (error) {
    console.log(error);
  }
  return Team;
};

export default TeamModel;
