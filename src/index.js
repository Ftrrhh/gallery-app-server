import express from "express";
import cors from "cors";
import { appPort } from "./config/constants.js";
import UserModel from "./models/user-model.js";
import Komentar from "./models/komentar-model.js";
import LikeFoto from "./models/like-model.js";
import Foto from "./models/foto-model.js";
import Album from "./models/album-model.js";
import sequelize from "./config/database.js";
import userRouter from "./routes/user-route.js";
import albumRouter from "./routes/album-route.js";

const app = express();

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("Halo Ges")
});

// UserModel.sync()
// Komentar.sync()
// LikeFoto.sync()
// Foto.sync()
// Album.sync()

// await sequelize.sync({force: true})

app.use(userRouter)
app.use(albumRouter)

app.listen(appPort, () => {
    console.log(`Server listening on : http://localhost:${appPort}/`);
});
