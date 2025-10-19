


import app from "./src/app.js";
import connectMongodb from "./src/db/db.js"

import dotenv from 'dotenv';
dotenv.config();

connectMongodb();

const PORT = process.env.PORT

console.log("database trying to connect");

app.listen(PORT, (req, res) => {
    console.log("server sucessfully run on port 5000");
})