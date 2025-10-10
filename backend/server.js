


import app from "./src/app.js";
import connectMongodb from "./src/db/db.js"

import dotenv from 'dotenv';
dotenv.config();


connectMongodb();

app.listen(5000, (req, res) => {
    console.log("server sucessfully run on port 5000");
})