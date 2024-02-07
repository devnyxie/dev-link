import { DataTypes, Model, Sequelize } from "sequelize";
import TeamModel from "./team.model";
import UserModel from "./user.model";
import MembersModel from "./members.model";
import { Team } from "../db";

interface CodeLangsAttributes {
  id: string;
  name: string;
}

interface CodeLangsCreationAttributes extends CodeLangsAttributes {}

export interface CodeLangsInstance
  extends Model<CodeLangsAttributes, CodeLangsCreationAttributes>,
    CodeLangsAttributes {}

const CodeLangsModel = (sequelize: Sequelize) => {
  const Language = sequelize.define<CodeLangsInstance>(
    "CodeLangs",
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
