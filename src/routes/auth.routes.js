import express from "express";
import { register, login, logout } from "../controllers/auth.controllers.js";
import { body } from "express-validator";
import authMiddleware from "../middleware/auth.middleware.js";
import { getMe } from "../controllers/auth.controllers.js";

const router = express.Router();

router.get("/me", authMiddleware, getMe);

router.post("/register",
    [
        body("name").notEmpty(),
        body("email").isEmail(),
        body("password").isLength({ min: 8 })
    ], register
);

router.post("/login",
    [
        body("email").isEmail(),
        body("password").exists()
    ], login
);

router.post("/logout", logout);

export default router