import { DataTypes, Model, Sequelize, Op } from "sequelize";
import TeamModel from "./team.model";
import UserModel from "./user.model";
import RequestsModel from "./requests.model";

interface MembersAttributes {
  id?: string;
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
      },
      role: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      user_id: {
        allowNull: true,
        type: DataTypes.UUID,
        onDelete: "CASCADE",
      },
    },
    {
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ["team_id", "user_id"],
          where: {
            user_id: {
              [Op.ne]: null,
            },
          },
        },
      ],
    }
  );

  Member.belongsTo(UserModel(sequelize), { foreignKey: "user_id" });
  Member.hasMany(RequestsModel(sequelize), { foreignKey: "member_id" });

  return Member;
};

export default MembersModel;
