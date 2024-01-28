"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const members_model_1 = __importDefault(require("./members.model"));
const user_model_1 = __importDefault(require("./user.model"));
const requests_model_1 = __importDefault(require("./requests.model"));
const TeamModel = (sequelize) => {
    const Team = sequelize.define("team", {
        id: {
            allowNull: false,
            primaryKey: true,
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            unique: true,
        },
        creator_id: {
            allowNull: false,
            type: sequelize_1.DataTypes.UUID,
            onDelete: "CASCADE",
        },
        name: {
            allowNull: false,
            type: sequelize_1.DataTypes.STRING,
        },
        description: {
            allowNull: true,
            type: sequelize_1.DataTypes.STRING,
        },
    }, {
        timestamps: true,
    });
    try {
        Team.hasMany((0, members_model_1.default)(sequelize), { foreignKey: "team_id" });
        Team.hasMany((0, requests_model_1.default)(sequelize), { foreignKey: "team_id" });
        Team.belongsTo((0, user_model_1.default)(sequelize), { foreignKey: "creator_id" });
    }
    catch (error) {
        console.log(error);
    }
    return Team;
};
exports.default = TeamModel;
