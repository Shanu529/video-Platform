import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import authRoute from "./routes/auth.routes.js";
import foodRoutes from "./routes/food.routes.js";
import foodPartnerController from "./routes/food-partner-route.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ FIXED CORS CONFIG
const allowedOrigins = [
  "http://localhost:5173",
  "https://video-platform-client.vercel.app"
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// ✅ Handle preflight requests manually (for Vercel)
app.options("*", cors({
  origin: allowedOrigins,
  credentials: true,
}));

// Routes
app.get("/", (req, res) => {
  res.send("hello world user");
});

app.use("/api/auth", authRoute);
app.use("/api/food", foodRoutes);
app.use("/api/food-partner", foodPartnerController);

export default app;
