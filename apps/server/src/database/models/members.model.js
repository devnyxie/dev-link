"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const user_model_1 = __importDefault(require("./user.model"));
const requests_model_1 = __importDefault(require("./requests.model"));
const MembersModel = (sequelize) => {
    const Member = sequelize.define("members", {
        id: {
            allowNull: false,
            primaryKey: true,
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
        },
        team_id: {
            allowNull: false,
            type: sequelize_1.DataTypes.UUID,
            onDelete: "CASCADE",
        },
        role: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
        },
        user_id: {
            allowNull: true,
            type: sequelize_1.DataTypes.UUID,
            onDelete: "CASCADE",
        },
    }, {
        timestamps: true,
        indexes: [
            {
                unique: true,
                fields: ["team_id", "user_id"],
            },
        ],
    });
    Member.belongsTo((0, user_model_1.default)(sequelize), { foreignKey: "user_id" });
    Member.hasMany((0, requests_model_1.default)(sequelize), { foreignKey: "member_id" });
    return Member;
};
exports.default = MembersModel;
