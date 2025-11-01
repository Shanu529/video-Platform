import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

import authRoute from "./routes/auth.routes.js";
import foodRoutes from "./routes/food.routes.js";
import foodPartnerController from "./routes/food-partner-route.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ ALLOWED ORIGINS
const allowedOrigins = [
  "http://localhost:5173",
  "https://video-platform-client.vercel.app",
];

// ✅ CORS Middleware (must be very early)
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// ✅ Routes
app.get("/", (req, res) => {
  res.send("hello world user");
});

app.use("/api/auth", authRoute);
app.use("/api/food", foodRoutes);
app.use("/api/food-partner", foodPartnerController);

export default app;
