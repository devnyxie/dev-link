import { DataTypes, Model, Sequelize } from "sequelize";
import TeamModel from "./team.model";
import UserModel from "./user.model";
import MembersModel from "./members.model";
import { Team } from "../db";

interface CodeLangsAttributes {
  id: string;
  codeLangId: string;
  teamId: string;
}

interface CodeLangsCreationAttributes extends CodeLangsAttributes {}

export interface CodeLangsInstance
  extends Model<CodeLangsAttributes, CodeLangsCreationAttributes>,
    CodeLangsAttributes {}

const teamCodeLangs = (sequelize: Sequelize) => {
  const Language = sequelize.define<CodeLangsInstance>(
    "teamCodeLangs",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      codeLangId: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      teamId: {
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

export default teamCodeLangs;
