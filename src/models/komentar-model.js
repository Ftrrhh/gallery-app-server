import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import UserModel from "./user-model.js";
import FotoModel from "./foto-model.js";

const KomentarModel = sequelize.define("komentarfoto", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    fotoId: {
        type: DataTypes.INTEGER
    },
    userId: {
        type: DataTypes.INTEGER
    },
    isi_komentar: {
        type: DataTypes.STRING
    },
    tanggal_komentar: {
        type: DataTypes.DATE
    },
}, {
    freezeTableName: true
});

export default KomentarModel;

FotoModel.hasMany(KomentarModel)
KomentarModel.belongsTo(FotoModel, {foreignKey: "fotoId"})
UserModel.hasMany(KomentarModel)
KomentarModel.belongsTo(UserModel, {foreignKey: "userId"})