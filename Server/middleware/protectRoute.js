import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import User from "../model/user.model.js"

dotenv.config()

export const protectRoutes = async(req,res,next)=>{
    try {
        const token = req.cookies.jwtToken
        if(!token) return res.status(400).json({message:"Unauthorised - No token provided"})
            const decode = jwt.verify(token,process.env.JWT_SECRET)
            const existingUser = await User.findById(decode.existingUserId).select("-password")
            if (!existingUser) {
                return res.status(401).json({ message: "Unauthorized - User not found" });
            }
            req.existingUser = existingUser

            next()
    } catch (error) {
        console.log("Error in user protectRoutes",error.message)
        return res.status(500).json({message:error.message})
    }
}