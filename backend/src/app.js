

import express from "express";
import cookieParser from "cookie-parser";

import authRoute from "./routes/auth.routes.js"
import foodRoutes from "./routes/food.routes.js"

const app = express();
app.use(cookieParser())


app.use(express.json())

app.get("/", (req, res) => {
    res.send("hello world")
});

app.use("/api/auth", authRoute)

app.use("/api/food", foodRoutes )

export default app;