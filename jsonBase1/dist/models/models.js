"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
const sequelize_1 = require("sequelize");
const Link = db_1.default.define('link', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    link: { type: sequelize_1.DataTypes.STRING, unique: true },
    json: { type: sequelize_1.DataTypes.JSON, unique: false }
});
exports.default = Link;
