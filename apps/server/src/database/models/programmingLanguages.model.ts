import { DataTypes, Model, Sequelize } from "sequelize";
import TeamModel from "./team.model";
import UserModel from "./user.model";
import MembersModel from "./members.model";
import { Team } from "../db";

interface ProgrammingLanguagesAttributes {
  id: string;
  name: string;
}

interface ProgrammingLanguagesCreationAttributes
  extends ProgrammingLanguagesAttributes {}

export interface ProgrammingLanguagesInstance
  extends Model<
      ProgrammingLanguagesAttributes,
      ProgrammingLanguagesCreationAttributes
    >,
    ProgrammingLanguagesAttributes {}

const ProgrammingLanguagesModel = (sequelize: Sequelize) => {
  const Language = sequelize.define<ProgrammingLanguagesInstance>(
    "ProgrammingLanguages",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
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

export default ProgrammingLanguagesModel;
