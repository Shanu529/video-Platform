import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

import authRoute from "./routes/auth.routes.js";
import foodRoutes from "./routes/food.routes.js";
import foodPartnerController from "./routes/food-partner-route.js";

dotenv.config();

const app = express();

// Middleware setup (must be before routes)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//  Define allowed origins clearly
const allowedOrigins = [
    "http://localhost:5173",
    "https://video-platform-client.vercel.app"
];

//  CORS setup (only once)
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.log("❌ CORS blocked for:", origin);
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));

//  Routes
app.get("/", (req, res) => {
    res.send("hello world user");
});

app.use("/api/auth", authRoute);
app.use("/api/food", foodRoutes);
app.use("/api/food-partner", foodPartnerController);

export default app;
