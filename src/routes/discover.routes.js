import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { discoverUsers } from "../controllers/discover.controllers.js"

const router = express.Router();


router.get("/", authMiddleware, discoverUsers);

export default router;
