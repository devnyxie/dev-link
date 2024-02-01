import { DataTypes, Model, Sequelize } from "sequelize";
import TeamModel from "./team.model";
import UserModel from "./user.model";
import MembersModel from "./members.model";

interface LanguagesAttributes {
  id: string;
  name: string;
}

interface LanguagesCreationAttributes extends LanguagesAttributes {}

export interface LanguagesInstance
  extends Model<LanguagesAttributes, LanguagesCreationAttributes>,
    LanguagesAttributes {}

const LanguagesModel = (sequelize: Sequelize) => {
  const Language = sequelize.define<LanguagesInstance>(
    "language",
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

export default LanguagesModel;
