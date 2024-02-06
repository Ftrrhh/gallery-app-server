import { Router } from "express";
import {
    createFoto,
    getAllFoto,
    getFotoById,
} from "../controllers/foto-controller.js";

const fotoRouter = Router()

fotoRouter.post('/foto', createFoto)
fotoRouter.get('/foto', getAllFoto)
fotoRouter.get('/foto/:id', getFotoById)

export default fotoRouter;