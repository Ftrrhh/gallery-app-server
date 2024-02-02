import { Router } from "express";
import { createFoto } from "../controllers/foto-controller.js";

const fotoRouter = Router()

fotoRouter.post('/foto', createFoto)

export default fotoRouter;