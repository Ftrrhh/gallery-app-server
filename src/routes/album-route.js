import { Router } from "express";
import { createAlbum } from "../controllers/album-controller.js";

const albumRouter = Router()

albumRouter.post("/album" , createAlbum)

export default albumRouter