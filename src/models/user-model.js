import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const UserModel = sequelize.define("user", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    password: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    namalengkap: {
        type: DataTypes.STRING
    },
    alamat: {
        type: DataTypes.STRING
    },
    refresh_token: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true
});

export default UserModel

