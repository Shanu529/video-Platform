

import foodPartnerModel from "../models/foodPartnerModel.js"

import jwt from "jsonwebtoken";

export const authFoodPartnerMiddlerware = async (req, res, next) => {


    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                messsage: "Please Login First"
            })
        }


        console.log("here is tokennnnnnnnnnnnnn", token);


        console.log("req, body from middlerwarerssssssssssssssssssss ", req.body);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded token:", decoded);

        const foodPartner = await foodPartnerModel.findById(decoded.id);
        console.log("here is food partnnerrrrrrrrrrrrrrrrr", foodPartner);
        req.foodPartner = foodPartner;

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid token"
        })
    }
}