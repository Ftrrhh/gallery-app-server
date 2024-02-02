import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { appPort } from "./config/constants.js";
import upload from "./utils/multer.js";
// import UserModel from "./models/user-model.js";
// import Komentar from "./models/komentar-model.js";
// import LikeFoto from "./models/like-model.js";
// import Foto from "./models/foto-model.js";
// import Album from "./models/album-model.js";
// import sequelize from "./config/database.js";
import userRouter from "./routes/user-route.js";
import albumRouter from "./routes/album-route.js";
import fotoRouter from "./routes/foto-route.js";

const app = express();

app.use(cors())

app.use(upload.single("images"))
app.use(express.json())
app.use(cookieParser())

app.get("/", (req, res) => {
    res.send("Halo Ges")
});

// UserModel.sync()
// Komentar.sync()
// LikeFoto.sync()
// Foto.sync()
// Album.sync()

// await sequelize.sync()

app.use(userRouter)
app.use(albumRouter)
app.use(fotoRouter)

app.listen(appPort, () => {
    console.log(`Server listening on : http://localhost:${appPort}/`);
});
