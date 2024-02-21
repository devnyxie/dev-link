import { DataTypes, Model, Sequelize } from "sequelize";
import TeamModel from "./team.model";
import UserModel from "./user.model";
import MembersModel from "./members.model";
import { Team } from "../db";

interface codeLangsAttributes {
  id: string;
  name: string;
}

interface codeLangsCreationAttributes extends codeLangsAttributes {}

export interface codeLangsInstance
  extends Model<codeLangsAttributes, codeLangsCreationAttributes>,
    codeLangsAttributes {}

const CodeLangsModel = (sequelize: Sequelize) => {
  const Language = sequelize.define<codeLangsInstance>(
    "codeLangs",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        unique: true,
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: true,
    }
  );

  return Language;
};

export default CodeLangsModel;
