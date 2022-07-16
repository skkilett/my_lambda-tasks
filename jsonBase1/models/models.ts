import sequelize from '../db';
import {DataTypes} from "sequelize";

const Link = sequelize.define('link', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
   link: {type: DataTypes.STRING, unique: true},
    json: {type: DataTypes.JSON, unique: false}
})

export default Link;