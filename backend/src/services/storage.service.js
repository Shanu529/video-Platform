
// import dotenv from "dotenv";
// dotenv.config();

// // import { ImageKit } from "imagekit"; // ✅ correct

// // import ImageKit from "imagekit"; // ✅ preferred


// import ImageKit from "imagekit";



// const imagekit = new ImageKit({
//     publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
//     privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
//     urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
// });


// export const uploadFile = async (file, fileName) =>{

//     const result = await imagekit.upload({
//         file:file.toString("base64"),
//         fileName:fileName
//     })

//     return result;
// }


import ImageKit from "imagekit";
import dotenv from "dotenv";
dotenv.config();
// console.log("here is poublic key ", process.env.IMAGEKIT_PUBLIC_KEY);
// console.log("here is private key ", process.env.IMAGEKIT_PRIVATE_KEY);
// console.log("here is url key ", process.env.IMAGEKIT_URL_ENDPOINT);


const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,

});

export const uploadFile = async (file, fileName) => {
    return await imagekit.upload({
        file: file, // convert buffer to base64
        fileName,
    });
};
