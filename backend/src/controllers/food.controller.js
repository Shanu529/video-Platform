
import { uploadFile } from "../services/storage.service.js";
import { v4 as uuidv4 } from "uuid";

import foodModel from "../models/food.model.js";

export const createFood = async (req, res) => {
    try {
        // console.log("req.foodPartnerrrrrrrrrrrrrr", req.foodPartner);
        // console.log("req.fileeeeeeeeeeeee", req.file);

        if (!req.file) {
            return res.status(400).send("No file uploaded");
        }

        const fileUploadResult = await uploadFile(req.file.buffer, uuidv4());
        // console.log("File uploadeddddddddddd:", fileUploadResult.url);   getting video url


        const foodItem = await foodModel.create({
            name: req.body.name,
            description: req.body.description,
            video: fileUploadResult.url,
            foodPartner: req.foodPartner.id   /// check it is _id or id or _Id or Id
        })


        res.status(201).json({

            message: "Video uploaded",
            food: foodItem
        })



    } catch (err) {
        console.error("here is errrorrrrr", err);
        res.status(500).send({ error: err.message });
    }
};

export const getFoodItems = async (req, res) => {
    const foodItems = await foodModel.find({})
    res.status(200).json({
        message: "Food items fetched successfully",
        foodItems
    })

}