


import mongoose from "mongoose";

function connectMongodb() {
    mongoose.connect(process.env.MONGODB).then(() => {
        console.log("database succesfully run");
    }).catch((e) => {
        console.log("database have error");

    })
}

export default connectMongodb;