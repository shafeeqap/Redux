import express from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  updatePassword,
  uploadProfileImage,
  deleteProfileImage,
  forgotPassword,
  resetPassword,
  resendOtp,
  verifyOTP,
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
userRouter.delete("/profileImage", protect, deleteProfileImage);
userRouter.post("/forgotPassword", forgotPassword);
userRouter.post("/resetPassword", resetPassword);
userRouter.post("/verifyOTP", verifyOTP);
userRouter.post("/resendOtp", resendOtp);

export default userRouter;
