import { DataTypes, Model, Sequelize } from "sequelize";
import bcrypt from "bcrypt";
import MembersModel from "./members.model";
import UserModel from "./user.model";

interface TeamAttributes {
  id: string;
  creator_id: string;
  name: string;
  description: string;
}

interface TeamCreationAttributes extends TeamAttributes {}

interface TeamInstance
  extends Model<TeamAttributes, TeamCreationAttributes>,
    TeamAttributes {}

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
    },
    {
      timestamps: true,
    }
  );
  try {
    // Team.hasMany(MembersModel(sequelize), { foreignKey: "team_id" });
    Team.belongsTo(UserModel(sequelize), { foreignKey: "creator_id" });
  } catch (error) {
    console.log(error);
  }
  return Team;
};

export default TeamModel;
