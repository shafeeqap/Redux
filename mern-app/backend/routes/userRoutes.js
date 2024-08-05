import express from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  updatePassword
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";
const userRouter = express.Router();

userRouter.post("/", registerUser);
userRouter.post("/auth", authUser);
userRouter.post("/logout", logoutUser);
userRouter.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile);
userRouter.put("/updatePassword", protect, updatePassword)


export default userRouter;
