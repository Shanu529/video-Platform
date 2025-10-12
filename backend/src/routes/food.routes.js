

import express from "express";

import { authFoodPartnerMiddlerware } from "../middlerware/auth.middlerware.js"

import { createFood } from "../controllers/food.controller.js";


import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({storage})

// const upload = multer.memoryStorage({
//     Storage: multer.memoryStorage()
// });

const router = express.Router()

router.post("/", authFoodPartnerMiddlerware, upload.single("video"), createFood)

export default router