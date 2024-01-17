import { DataTypes, Model, Sequelize } from "sequelize";
import TeamModel from "./team.model";
import UserModel from "./user.model";

interface MembersAttributes {
  id: string;
  team_id: string;
  role: string;
  user_id: string;
}

interface MembersCreationAttributes extends MembersAttributes {}

interface MembersInstance
  extends Model<MembersAttributes, MembersCreationAttributes>,
    MembersAttributes {}

const MembersModel = (sequelize: Sequelize) => {
  const Member = sequelize.define<MembersInstance>(
    "members",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      team_id: {
        allowNull: false,
        type: DataTypes.UUID,
        onDelete: "CASCADE",
        // references: {
        //   model: TeamModel(sequelize),
        //   key: "id",
        // },
      },
      role: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      user_id: {
        allowNull: true,
        type: DataTypes.UUID,
        onDelete: "CASCADE",
        // references: {
        //   model: UserModel(sequelize),
        //   key: "id",
        // },
      },
    },
    {
      timestamps: true,
    }
  );
  // Member.belongsTo(TeamModel(sequelize), { foreignKey: "team_id" });
  Member.belongsTo(UserModel(sequelize), { foreignKey: "user_id" });
  Member.belongsTo(TeamModel(sequelize), { foreignKey: "team_id" });
  return Member;
};

export default MembersModel;
