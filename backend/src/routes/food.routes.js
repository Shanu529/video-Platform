

import express from "express";

import { authFoodPartnerMiddlerware, authUserMiddlerware } from "../middlerware/auth.middlerware.js"

import { createFood, getFoodItems, getSaveFood, likeFood, saveFood } from "../controllers/food.controller.js";



import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({ storage })

// const upload = multer.memoryStorage({
//     Storage: multer.memoryStorage()
// });

const router = express.Router()

router.post("/", authFoodPartnerMiddlerware,
    upload.single("video"),
    createFood)

router.get("/", authUserMiddlerware, getFoodItems);

  


router.post('/like',
    authUserMiddlerware,likeFood)


router.post('/save',
    authUserMiddlerware,saveFood
)

router.get('/save',
    authUserMiddlerware ,getSaveFood
)

export default router