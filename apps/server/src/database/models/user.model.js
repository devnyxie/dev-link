"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserModel = (sequelize) => {
    const User = sequelize.define("user", {
        id: {
            allowNull: false,
            primaryKey: true,
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            unique: true,
        },
        gh_id: {
            allowNull: true,
            primaryKey: true,
            type: sequelize_1.DataTypes.STRING,
            unique: true,
        },
        gh_username: {
            allowNull: true,
            type: sequelize_1.DataTypes.STRING,
            unique: true,
        },
        username: {
            allowNull: false,
            type: sequelize_1.DataTypes.STRING,
            unique: true,
        },
        password: {
            allowNull: false,
            type: sequelize_1.DataTypes.STRING,
            unique: true,
        },
        pfp: {
            type: sequelize_1.DataTypes.STRING,
        },
    }, {
        timestamps: true,
    });
    // Password Hashing
    User.beforeCreate((user) => __awaiter(void 0, void 0, void 0, function* () {
        const saltRounds = 10;
        const hashedPassword = yield bcrypt_1.default.hash(user.password, saltRounds);
        user.password = hashedPassword;
    }));
    return User;
};
exports.default = UserModel;
