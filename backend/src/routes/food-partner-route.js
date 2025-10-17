

import express from "express";

const router = express.Router()

import { authUserMiddlerware } from "../middlerware/auth.middlerware.js";
import { getFoodPartnerById } from "../controllers/food-partner-controller.js";

router.get("/:id", authUserMiddlerware, getFoodPartnerById)

export default router