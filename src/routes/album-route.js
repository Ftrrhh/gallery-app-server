import { Router } from "express";
import { 
    createAlbum,
    getAllAlbum,
    getAlbumById,
    updateAlbum
} from "../controllers/album-controller.js";

const albumRouter = Router()

albumRouter.post("/album" , createAlbum)
albumRouter.get("/album" , getAllAlbum)
albumRouter.get("/album/:id" , getAlbumById)
albumRouter.patch("/album/:id" , updateAlbum)

export default albumRouter