import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import { swipeUser } from "../controllers/swipe.controllers.js";

const router = express.Router();

router.post("/", authMiddleware, swipeUser);

export default router;