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
      indexes: [
        {
          unique: true,
          fields: ["team_id", "user_id"],
        },
      ],
    }
  );
  //
  Request.beforeCreate(async (request, options) => {
    const existingMember = await MembersModel(sequelize).findOne({
      where: { team_id: request.team_id, user_id: request.user_id },
    });

    if (existingMember) {
      throw new Error(
        "User is already a member of the team and cannot create a request."
      );
    }
  });

  // Add a hook to limit users who are not members to only one request
  Request.beforeCreate(async (request, options) => {
    const existingRequest = await Request.findOne({
      where: { team_id: request.team_id, user_id: request.user_id },
    });

    if (existingRequest) {
      throw new Error("User has already created a request for this team.");
    }
  });
  //
  Request.belongsTo(UserModel(sequelize), { foreignKey: "user_id" });
  return Request;
};

export default RequestsModel;
