import { DataTypes, Model, Sequelize } from "sequelize";
import bcrypt from "bcrypt";
import MembersModel from "./members.model";
import UserModel from "./user.model";
import RequestsModel from "./requests.model";
import CodeLangsModel, { codeLangsInstance } from "./codeLangs.model";
import { BelongsToManyAddAssociationsMixin } from "sequelize/types";

interface TeamAttributes {
  id: string;
  creator_id: string;
  name: string;
  description: string;
  README: string;
}

interface TeamCreationAttributes extends TeamAttributes {}

interface TeamInstance
  extends Model<TeamAttributes, TeamCreationAttributes>,
    TeamAttributes {
  addCodeLangs: BelongsToManyAddAssociationsMixin<
    codeLangsInstance,
    codeLangsInstance["id"]
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
      README: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
    },
    {
      timestamps: true,
    }
  );
  return Team;
};

export default TeamModel;
