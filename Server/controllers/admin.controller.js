import express from "express"
import dotenv from "dotenv"
import Admin from "../model/admin.model.js"
import bcrypt from "bcryptjs"
import generateAdminCookie from "../lib/generateAdminCookie.js"

dotenv.config()
export const registerAdmin = async(req, res)=>{
    const {title,name,email,password,faculty,department} = req.body
    try {
        if(!title || !name || !email || !password || !faculty || !department){
            return res.status(400).json({message:"Fill in all fields"})
        }
        const existingAdmin = await Admin.findOne({email})

        if(existingAdmin){
            return res.status(400).json({message:"Admin exist Already"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newAdmin = new Admin({
            title:title,
            name:name,
            email:email,
            password:hashedPassword,
            faculty:faculty,
            department:department,

        })
        await newAdmin.save()

        res.status(200).json({
            message:"Admin Created Successfully",
            newAdmin
        })
    } catch (error) {
        console.log("Error in registering Admin", error)
        res.status(500).json("Internal Server Error")
    }
}

export const loginAdmin = async(req,res)=>{
    const {email,password} = req.body
    try {
        const existingAdmin = await Admin.findOne({email})
        if(!existingAdmin){
            return res.status(400).json("Admin Unavaible")
        }
        const isAdminPasswordCorrect = await bcrypt.compare(existingAdmin.password,password)
        if(!isAdminPasswordCorrect){
            return res.status(400).json("Invalid Credientials")
        }

        const token = generateAdminCookie(existingAdmin,res)
        res.status(200).json({ 
            token, 
            user: existingUser, 
            message: "Login Successful" });
    } catch (error) {
        console.log("Error in Admin Login", error)
        res.status(500).json("Internal Server Error")
    }
}

export const logoutAdmin = async(req,res)=>{
    try {
        res.cookie("jwtToken","",{maxAge:1})
        res.status(200).json("Logout Successfull")
    } catch (error) {
        console.log("Error in Logout Admin", error)
        res.status(500).json("Internal Server Error")
    }
}
export const adminProfile = async(req,res)=>{
    try {
        const existingAdmin = await Admin.findById(res.existingAdmin._id).select("-password")
        if(!existingAdmin){
            return res.status(400).json("Profile Unavaiable")
        }
        res.status(200).json({existingAdmin})
    } catch (error) {
        console.log("Error in Admin Profile", error)
        res.status(500).json("Internal Server Error")
    }
}