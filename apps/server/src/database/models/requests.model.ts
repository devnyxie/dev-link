import { DataTypes, Model, Sequelize } from "sequelize";
import TeamModel from "./team.model";
import UserModel from "./user.model";
import MembersModel from "./members.model";

interface RequestsAttributes {
  id: string;
  team_id: string;
  user_id: string;
  member_id: string;
  accepted: boolean;
}

interface RequestsCreationAttributes extends RequestsAttributes {}

interface RequestsInstance
  extends Model<RequestsAttributes, RequestsCreationAttributes>,
    RequestsAttributes {}

const RequestsModel = (sequelize: Sequelize) => {
  const Request = sequelize.define<RequestsInstance>(
    "request",
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
      user_id: {
        allowNull: false,
        type: DataTypes.UUID,
        onDelete: "CASCADE",
      },
      member_id: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      accepted: {
        allowNull: true,
        type: DataTypes.BOOLEAN,
      },
    },
    {
      timestamps: true,
    }
  );
  Request.belongsTo(UserModel(sequelize), { foreignKey: "user_id" });
  return Request;
};

export default RequestsModel;
