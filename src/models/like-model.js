import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import UserModel from "./user-model.js";
import FotoModel from "./foto-model.js";

const LikeModel = sequelize.define("like_foto", {
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
    tanggal_like: {
        type: DataTypes.DATE
    },
},{
        freezeTableName: true        
});

export default LikeModel;

UserModel.hasMany(LikeModel)
LikeModel.belongsTo(UserModel, {foreignKey: "userId"})
FotoModel.hasMany(LikeModel)
LikeModel.belongsTo(FotoModel, {foreignKey: "fotoId"})