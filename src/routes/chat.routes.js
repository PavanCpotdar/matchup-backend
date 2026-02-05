import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { getMessages, sendMessage } from "../controllers/chat.controllers.js";

const router = express.Router();

router.get("/:matchId", authMiddleware, getMessages);
router.post("/:matchId", authMiddleware, sendMessage);

export default router;
