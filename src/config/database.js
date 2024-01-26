import { Sequelize } from "sequelize";

const sequelize = new Sequelize("gallery_photo","root","",{
    host:"localhost",
    dialect:"mysql",
})

export default sequelize;