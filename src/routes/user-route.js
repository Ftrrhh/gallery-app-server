import { Router } from "express"
import { getAllUsers } from "../controllers/user-controller.js";
import {
    verifyToken,
    register,
    login,
    refreshToken,
    logout
} from "../controllers/authentication.js";

const userRouter = Router()

userRouter.get("/users", verifyToken, getAllUsers);
userRouter.post("/users", register);
userRouter.post("/login", login);
userRouter.get("/token", refreshToken);
userRouter.delete("/logout", logout);

export default userRouter