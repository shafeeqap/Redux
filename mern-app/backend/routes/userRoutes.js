import express from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  updatePassword,
  uploadProfileImage,
  getProfileImage,
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/fileUploadMiddleware.js";

const userRouter = express.Router();

userRouter.post("/", registerUser);
userRouter.post("/auth", authUser);
userRouter.post("/logout", logoutUser);
userRouter.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile);
userRouter.put("/updatePassword", protect, updatePassword);
userRouter.post("/profileImage", upload.single('profileImage'), protect, uploadProfileImage);
userRouter.get("/profileImage:id", protect, getProfileImage);


export default userRouter;
