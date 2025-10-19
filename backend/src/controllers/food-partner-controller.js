


import mongoose from "mongoose";
import foodPartnerModel from "../models/foodPartnerModel.js";
import foodModel from "../models/food.model.js";

export const getFoodPartnerById = async (req, res) => {
    const foodPartnerId = req.params.id;
    console.log("here is req.params.id ",req.params.id);
    
 
    if (!mongoose.Types.ObjectId.isValid(foodPartnerId)) {
        return res.status(400).json({ message: "Invalid food partner ID" });
    }

    try {
        const foodPartner = await foodPartnerModel.findById(foodPartnerId);
        if (!foodPartner) {
            return res.status(404).json({ message: "Food partner not found" });
        }

        const foodItemsByFoodPartner = await foodModel.find({ foodPartner:foodPartnerId });

        res.status(200).json({
            message: "Food partner retrieved successfully",
            foodPartner: {
                ...foodPartner.toObject(),
                foodItems:foodItemsByFoodPartner
            }
        });
    } catch (error) {
        console.error("Error in getFoodPartnerById:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
