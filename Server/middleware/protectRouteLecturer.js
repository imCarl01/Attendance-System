import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import Lecturer from "../model/lecturer.model.js"

dotenv.config()

export const protectRouteLecturer = async(req,res,next)=>{
    try {
        const token = req.cookies.jwtToken
        if(!token) return res.status(400).json({message:"Unauthorised"})
            const decode = jwt.verify(token,process.env.JWT_SECRET)
            const existingLecturer = await Lecturer.findById(decode.existingLecturerId).select("-password")
            req.existingLecturer = existingLecturer

            next()
    } catch (error) {
        console.log("Error in Lecturer protectRoutes",error.message)
        return res.status(500).json({message:error.message})
    }
}