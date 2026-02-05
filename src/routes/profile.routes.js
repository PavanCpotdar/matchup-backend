import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { upsertProfile, getMyProfile } from "../controllers/profile.controllers.js";


const router = express.Router();

router.post("/", authMiddleware, upsertProfile);
router.get("/me", authMiddleware, getMyProfile);

export default router;
