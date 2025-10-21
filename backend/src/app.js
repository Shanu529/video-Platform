

import express from "express";
import cookieParser from "cookie-parser";

import authRoute from "./routes/auth.routes.js"
import foodRoutes from "./routes/food.routes.js"

import foodPartnerController from "./routes/food-partner-route.js"
const app = express();
// ✅ Add this before routes
app.use(express.json()); // <-- parses incoming JSON request bodies
app.use(express.urlencoded({ extended: true })); // <-- handles form data
app.use(cookieParser());


import cors from "cors"

// app.use(cookieParser())


import dotenv from 'dotenv';
dotenv.config();

const allowedOrigins = [
    "http://localhost:5173",  // local dev
    "https://video-platform-8cg0mmtw8-shanu529s-projects.vercel.app"  // deployed frontend
];

// Use environment variable if defined, else fallback to the allowed list
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin) || origin === process.env.FRONTEND_URL) {
            callback(null, true);
        } else {
            console.log("❌ CORS blocked for:", origin);
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true, // if using cookies or JWTs
};

app.use(cors(corsOptions));
app.get("/", (req, res) => {
    res.send("hello world user")
});

app.use("/api/auth", authRoute)

app.use("/api/food", foodRoutes)

app.use("/api/food-partner", foodPartnerController)

export default app;