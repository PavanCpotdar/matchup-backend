import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { getMyMatches } from "../controllers/match.controllers.js";

const router = express.Router();

router.get("/", authMiddleware, getMyMatches);

export default router