import express from 'express';
import { handleGetUsers, handleLogin, handleSignup } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/getuser", handleGetUsers);
userRouter.post("/signup", handleSignup);
userRouter.post("/login", handleLogin);


export default userRouter;