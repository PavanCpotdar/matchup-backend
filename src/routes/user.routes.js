import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { getMe } from "../controllers/user.controllers.js";

const router = express.Router();

// get current user profile
router.get("/me", authMiddleware, getMe);

export default router;