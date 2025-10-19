


import mongoose from "mongoose";

const likesSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required: true
    },
    food: {
        type: mongoose.Schema.ObjectId,
        ref: "food",
        required: true
    }

}, {
    timestamps: true
})

const Like = mongoose.model("like", likesSchema);

export default Like;