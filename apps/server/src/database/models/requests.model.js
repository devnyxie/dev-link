"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const user_model_1 = __importDefault(require("./user.model"));
const RequestsModel = (sequelize) => {
    const Request = sequelize.define("request", {
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
        user_id: {
            allowNull: false,
            type: sequelize_1.DataTypes.UUID,
            onDelete: "CASCADE",
        },
        member_id: {
            allowNull: false,
            type: sequelize_1.DataTypes.UUID,
        },
        accepted: {
            allowNull: true,
            type: sequelize_1.DataTypes.BOOLEAN,
        },
    }, {
        timestamps: true,
    });
    Request.belongsTo((0, user_model_1.default)(sequelize), { foreignKey: "user_id" });
    return Request;
};
exports.default = RequestsModel;
