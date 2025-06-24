// routes/userRoutes.js
import express from "express";
import { protectRoutes } from "../middleware/auth.js";
import {
  getAllUsers,
  getProfile,
  updateProfile,
  checkAuth,
} from "../controller/userController.js";

const router = express.Router();

router.get("/", protectRoutes, getAllUsers);
router.get("/profile", protectRoutes, getProfile);
router.put("/update-profile", protectRoutes, updateProfile);
router.get("/check-auth", protectRoutes, checkAuth);

export default router;
