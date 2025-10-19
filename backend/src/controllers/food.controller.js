
import { uploadFile } from "../services/storage.service.js";
import { v4 as uuidv4 } from "uuid";

import foodModel from "../models/food.model.js";
import likeModel from "../models/likes.model.js"

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

// export const likeFood = async (req, res) => {
//     const { foodId } = req.body
//     // console.log("here is food id",foodId);

//     const user = req.user;

//     const isAlreadyLiked = await likeModel.findOne({
//         user: user._id,
//         food: foodId
//     });

//     if (isAlreadyLiked) {
//         await likeModel.deleteOne({
//             user: user._id,
//             food: foodId
//         })

//         await foodModel.findByIdAndUpdate(foodId, {
//             $inc: { likeCount: -1 }
//         })

//         return res.status(200).json({
//             message: "Food unliked successfully"
//         })
//     }


//     const like = await foodModel.create({
//         user: user._id,
//         food: foodId
//     })

//     await foodModel.findByIdAndUpdate(foodId, {
//         $inc: { likeCount: 1 }
//     })
//     res.status(201).json({
//         message: "Food liked successfully",
//         like
//     })

// }

export const likeFood = async (req, res) => {
    const { foodId } = req.body;
    const user = req.user;

    if (!user) {
        return res.status(401).json({ message: "User not found" });
    }

    try {
        const isAlreadyLiked = await likeModel.findOne({
            user: user._id,
            food: foodId
        });

        if (isAlreadyLiked) {
            await likeModel.deleteOne({ user: user._id, food: foodId });

            await foodModel.findByIdAndUpdate(foodId, {
                $inc: { likeCount: -1 }
            });

            return res.status(200).json({ message: "Food unliked successfully" });
        }

        const like = await likeModel.create({
            user: user._id,
            food: foodId
        });

        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { likeCount: 1 }
        });

        res.status(201).json({
            message: "Food liked successfully",
            like
        });

    } catch (error) {
        console.error("Like error:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

export const saveFood = async (req, res)=> {

    const { foodId } = req.body;
    const user = req.user;

    const isAlreadySaved = await saveModel.findOne({
        user: user._id,
        food: foodId
    })

    if (isAlreadySaved) {
        await saveModel.deleteOne({
            user: user._id,
            food: foodId
        })

        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { savesCount: -1 }
        })

        return res.status(200).json({
            message: "Food unsaved successfully"
        })
    }

    const save = await saveModel.create({
        user: user._id,
        food: foodId
    })

    await foodModel.findByIdAndUpdate(foodId, {
        $inc: { savesCount: 1 }
    })

    res.status(201).json({
        message: "Food saved successfully",
        save
    })

}

export const getSaveFood = async (req, res) => {

    const user = req.user;

    const savedFoods = await saveModel.find({ user: user._id }).populate('food');

    if (!savedFoods || savedFoods.length === 0) {
        return res.status(404).json({ message: "No saved foods found" });
    }

    res.status(200).json({
        message: "Saved foods retrieved successfully",
        savedFoods
    });

}

