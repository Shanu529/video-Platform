

import foodPartnerModel from "../models/foodPartnerModel.js"
import usermodel from "../models/user.model.js";
import jwt, { decode } from "jsonwebtoken";

export const authFoodPartnerMiddlerware = async (req, res, next) => {


    try {
        const token =
            req.cookies.token || req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                messsage: "Please Login First"
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const foodPartner = await foodPartnerModel.findById(decoded.id);
        req.foodPartner = foodPartner;
        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid token"
        })
    }
}

export const authUserMiddlerware = async (req, res, next) => {



    const token =
        req.cookies.token || req.headers.authorization?.split(" ")[1];


    if (!token) {
        return res.status(401).json({
            message: "Login First"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await usermodel.findById(decoded.id);

        req.user = user;

        next()
    } catch (error) {
        return res.status(401).json({
            message: "Invalid token"
        })
    }
}