

// import { sign } from "jsonwebtoken";
import usermodel from "../models/user.model.js"
import foodPartnerModel from "../models/foodPartnerModel.js";
import bcrypt from "bcrypt";
import e from "express";
import jwt from 'jsonwebtoken';

import pkg from "jsonwebtoken";
const { sign } = pkg;


export const registerUser = async (req, res) => {

    const { fullname, email, password } = req.body;

    console.log("here is req, in backend ",req.body);
    

    try {
        const isUserAlreadyExists = await usermodel.findOne({
            email
        });

        // if (!isUserAlreadyExists) {
        //     return res.status(400).json({ message: "user already exists" })
        // }

        if (isUserAlreadyExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashPass = await bcrypt.hash(password, 10);

        const user = await usermodel.create({
            fullname,
            email,
            password: hashPass
        });

        const token = jwt.sign({
            id: user._id,
        }, process.env.JWT_SECRET)

        res.cookie("token", token, { httpOnly: true, secure: true });

        res.status(201).json({
            message: "User registered successfully",
            user: {
                _id: user._id,
                email: user.email,
                fullname: user.fullname,

            }

        })


    } catch (error) {
        return res.status(500).json({ message: "something went wrong in register controller", error })
    }
}

export const loginUser = async (req, res) => {

    const { email, password } = req.body;

    try {
        const user = await usermodel.findOne({
            email
        });

        if (!email) {
            return res.status(400).json({ message: "Invalid Username or Password" })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid Username or Password" })
        }

        const token = jwt.sign({
            id: user._id,
        }, process.env.JWT_SECRET);

        res.cookie("token", token);

        res.status(200).json({
            message: "User logged in successfully",
            user: {
                _id: user._id,
                email: user.email,
                fullname: user.fullname
            }
        })

    } catch (error) {
        return res.status(500).json({ message: "something went wrong in login controller", error })

    }
}

export const logoutUser = async (req, res) => {

    res.clearCookie("token")
    res.status(200).json({
        message: "Logout successfully"
    });
}


// Food Partner controller
export const registerFoodPartner = async (req, res) => {

    const { name, email, password, phone, address, contactName } = req.body;

    try {

        const isAccountAlreadyExists = await foodPartnerModel.findOne({
            email
        });

        if (isAccountAlreadyExists) {
            res.status(400).json({ message: "food partner already exists" })
        };

        const hashPassword = await bcrypt.hash(password, 10);

        const foodPartner = await foodPartnerModel.create({
            name,
            email,
            password: hashPassword,
            phone,
            address,
            contactName
        });

        const token = jwt.sign({
            id: foodPartner._id,
        }, process.env.JWT_SECRET);

        res.cookie("token", token)


        res.status(200).json({
            message: "food partner register successfully", foodPartner: {
                _id: foodPartner._id,
                email: foodPartner.email,
                name: foodPartner.name,
                address: foodPartner.address,
                contactName: foodPartner.contactName,
                phone: foodPartner.phone
            }
        },)

    } catch (error) {
        res.status(500).json({ message: "error in foodpartner register controller function", error })
    }

}


export const loginFoodPartner = async (req, res) => {

    try {
        const { email, password } = req.body;

        const foodPartner = await foodPartnerModel.findOne({ email });

        if (!foodPartner) {
            res.status(400).json({ message: "Invalid email or password" })
        }

        const isPasswordValid = await bcrypt.compare(password, foodPartner.password);

        if (!isPasswordValid) {
            res.status(400).json({ message: "Invalid email or password" })
        };

        const token = jwt.sign({
            id: foodPartner._id
        }, process.env.JWT_SECRET);

        res.cookie("token", token)

        res.status(200).json({
            message: "Food partner logged in successfully",
            foodPartner: {
                id: foodPartner._id,
                email: foodPartner.email,
                name: foodPartner.name,
            }
        })

    } catch (error) {
        res.status(500).json({ message: "error in foodpartner login controller function", error })
    }
}


export const logoutFoodPartner = async (req, res) => {

    res.clearCookie("token")
    res.status(200).json({
        message: "Food partner logged out successfully"
    });
}