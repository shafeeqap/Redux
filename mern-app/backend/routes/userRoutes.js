import express from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";
const userRouter = express.Router();

userRouter.post("/", registerUser);
userRouter.post("/auth", authUser);
userRouter.post("/logout", logoutUser);
userRouter.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile);


export default userRouter;
