

// import { v4 as uuidv4 } from 'uuid';
// import {uploadFile} from "../services/storage.service.js"



// export const createFood = async  (req, res) =>{

//     let getID =  req.foodPartner  
//     console.log("here is req.foodPartner details",getID);
//     console.log(req.file);
    
//     // console.log("here is req.body details ",req.body);

//     const fileUploadResult = await uploadFile(req.file.buffer, uuidv4());

//     console.log("here is fileUploadResult response ",fileUploadResult);
    

//     res.send("video generated")
      
// }       

import { uploadFile } from "../services/storage.service.js";
import { v4 as uuidv4 } from "uuid";

export const createFood = async (req, res) => {
  try {
    console.log("req.foodPartnerrrrrrrrrrrrrr", req.foodPartner);
    console.log("req.fileeeeeeeeeeeee", req.file);

    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }

    const fileUploadResult = await uploadFile(req.file.buffer, uuidv4());
    console.log("File uploadeddddddddddd:", fileUploadResult);

    res.send({ message: "Video uploaded", data: fileUploadResult });
  } catch (err) {
    console.error("here is errrorrrrr",err);
    res.status(500).send({error: err.message });
  }
};
