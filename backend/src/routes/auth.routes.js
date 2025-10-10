
import express from "express";

const router = express.Router()

import { loginFoodPartner, logoutFoodPartner, registerFoodPartner, registerUser } from "../controllers/auth.controller.js"
import { loginUser } from "../controllers/auth.controller.js"
import { logoutUser } from "../controllers/auth.controller.js"

// User Routes
router.post("/user/register",registerUser)
router.post("/user/login",loginUser)
router.post("/user/logout",logoutUser )


// Food Partner Routes
router.post("/food-partner/register",registerFoodPartner)
router.post("/food-partner/login",loginFoodPartner)
router.post("/food-partner/logout",logoutFoodPartner)



export default router