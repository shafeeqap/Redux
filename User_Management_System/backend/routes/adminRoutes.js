import express from "express";
import { addNewUser, blockUnblockUser, deleteUser, getUsers, loginAdmin, logoutAdmin } from "../controllers/adminController.js";
import { authorizeRole } from "../middlewares/authorizeRole.js";
import { protect } from "../middlewares/authMiddleware.js";

const adminRouter = express.Router();

adminRouter.post("/login", loginAdmin);
adminRouter.post("/logout", logoutAdmin);
adminRouter.post("/add-user",protect, authorizeRole("admin"), addNewUser)
adminRouter.get("/users", protect, authorizeRole("admin"), getUsers);
adminRouter.delete("/users/:id", protect, authorizeRole('admin'), deleteUser);
adminRouter.patch("/users/block-unblock/:id", protect, authorizeRole('admin'), blockUnblockUser);
adminRouter.put("/users/update-user/:id", protect, authorizeRole('admin'));


export default adminRouter;
