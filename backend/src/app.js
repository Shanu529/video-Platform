

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


app.use(cors({
    origin:process.env.FRONTEND_URL, 
    credentials: true,
})
);

app.get("/", (req, res) => {
    res.send("hello world user")
});

app.use("/api/auth", authRoute)

app.use("/api/food", foodRoutes)

app.use("/api/food-partner", foodPartnerController)

export default app;