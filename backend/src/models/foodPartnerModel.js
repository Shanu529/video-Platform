


import mongoose, { Types } from "mongoose";

const foodPartnerSchema = mongoose.Schema({

    name: {
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
}) 

const foodPartnerModel = mongoose.model("foofPartner",foodPartnerSchema );

export default foodPartnerModel;