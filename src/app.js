import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import swipeRoutes from "./routes/swipe.routes.js";
import matchRoutes from "./routes/match.routes.js";
import discoverRoutes from "./routes/discover.routes.js"
import chatRoutes from "./routes/chat.routes.js";


const app = express();
app.use(cookieParser());

/* security middlewares */
app.use(helmet());
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

/* rate limiter */
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
})
app.use(limiter);

/* health check */
app.get("/api/health", (req, res) => {
    res.json({ status: "OK" })
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/swipe", swipeRoutes);
app.use("/api/match", matchRoutes);
app.use("/api/discover", discoverRoutes);
app.use("/api/chat", chatRoutes);

export default app;
