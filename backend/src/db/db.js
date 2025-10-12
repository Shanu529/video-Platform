


import mongoose from "mongoose";

function connectMongodb() {
    mongoose.connect(process.env.MONGODB).then(() => {
        console.log("database succesfully run");
    }).catch((e) => {
        console.log("database have error", e);

    })
}

export default connectMongodb;