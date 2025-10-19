

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


app.use(cors({
    origin: ["http://localhost:5173", "http://10.217.211.147:5173"], 
    credentials: true,
})
);

app.get("/", (req, res) => {
    res.send("hello world")
});

app.use("/api/auth", authRoute)

app.use("/api/food", foodRoutes)

app.use("/api/food-partner", foodPartnerController)

export default app;