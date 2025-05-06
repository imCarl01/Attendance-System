import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import express from "express";
import generateCookie from "../lib/generatecokiee.js";


const router = express.Router()
dotenv.config();

export const register = async (req, res) => {
    const {name,email,password,role,faceDescriptor} = req.body;
   try {

    if(!name || !email || !password || !role || !faceDescriptor){
        return res.status(400).json({message:"Please fill all the fields"})
    }

    if(!Array.isArray(faceDescriptor) || faceDescriptor.length !== 128) {
        return res.status(400).json({ message: "faceDescriptor must be an array of 128 numbers" });
    }
    const existingUser = await User.findOne({email})

    if(existingUser){
        return res.status(400).json({message:"User already exist"})
    }
    
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)
    const newUser = new User({
        name,
        email,
        password:hashedPassword,
        role,
        faceDescriptor
    })
    await newUser.save()
    res.status(201).json({message:"User Created Successfully"})
   } catch (error) {
    console.error("Regsitration Failed",error)
    res.status(500).json({message:"Internal Server Error"})
   }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(400).json({ message: "User not found" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = generateCookie(existingUser, res);
        res.status(200).json({ 
            token, 
            user: existingUser, 
            message: "Login Successful" });
        
    } catch (error) {
        console.error("Login Failed", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const logout = async(req,res)=>{
    try {
        res.cookie("jwtToken","",{maxAge:1})
        res.status(200).json("Logout Successfull")
    } catch (error) {
        console.log("Error in Logout User", error)
        res.status(500).json("Internal Server Error")
    }
}
export const profile = async (req, res) => {
    try {
        const existingUser = await User.findById(req.existingUser._id).select("-password");
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ existingUser });
    } catch (error) {
        console.error("Profile Fetch Failed", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
