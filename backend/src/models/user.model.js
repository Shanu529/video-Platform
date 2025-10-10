


import mongoose, { Schema } from "mongoose";


const userSchema = new Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    },

)

const usermodel = new mongoose.model("usermodel", userSchema);

export default usermodel;

