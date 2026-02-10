import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { getMessages, sendMessage } from "../controllers/chat.controllers.js";

const router = express.Router();

router.get("/:id", authMiddleware, getMessages);
router.post("/:id", authMiddleware, sendMessage);

export default router;
