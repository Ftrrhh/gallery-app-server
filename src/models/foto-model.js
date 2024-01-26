import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import AlbumModel from "./album-model.js";
import UserModel from "./user-model.js";

const FotoModel = sequelize.define("foto",{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    judul_foto: {
        type: DataTypes.STRING
    },
    deskripsi_foto: {
        type: DataTypes.STRING
    },
    tanggal_posting: {
        type: DataTypes.DATE
    },
    lokasi_file: {
        type: DataTypes.STRING
    },
    albumId: {
        type: DataTypes.INTEGER
    },
    userId: {
        type: DataTypes.INTEGER
    },
}, {
    freezeTableName: true
});

export default FotoModel;

AlbumModel.hasMany(FotoModel)
FotoModel.belongsTo(AlbumModel, {foreignKey: "albumId"})
UserModel.hasMany(FotoModel)
FotoModel.belongsTo(UserModel, { foreignKey: "userId"})