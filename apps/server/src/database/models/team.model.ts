import { DataTypes, Model, Sequelize } from "sequelize";
import bcrypt from "bcrypt";
import MembersModel from "./members.model";
import UserModel from "./user.model";
import RequestsModel from "./requests.model";
import CodeLangsModel, { CodeLangsInstance } from "./codeLangs.model";
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
  addCodeLangs: BelongsToManyAddAssociationsMixin<
    CodeLangsInstance,
    CodeLangsInstance["id"]
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
        type: DataTypes.TEXT,
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
    //
  } catch (error) {
    console.log(error);
  }
  return Team;
};

export default TeamModel;
