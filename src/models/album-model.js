import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import UserModel from "./user-model.js";

const AlbumModel = sequelize.define("album", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nama_album: {
        type: DataTypes.STRING
    },
    deskripsi: {
        type: DataTypes.STRING
    },
    tanggal_dibuat: {
        type: DataTypes.DATE
    },
    userId: {
        type: DataTypes.INTEGER
    },
}, {
    freezeTableName: true
});

export default AlbumModel;

UserModel.hasMany(AlbumModel)
AlbumModel.belongsTo(UserModel, { foreignKey: "userId" })