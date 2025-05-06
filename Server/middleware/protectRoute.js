import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import User from "../model/user.model.js"

dotenv.config()

export const protectRoutes = async(req,res,next)=>{
    try {
        const token = req.cookies.jwtToken
        if(!token) return res.status(400).json({message:"Unauthorised"})
            const decode = jwt.verify(token,process.env.JWT_SECRET)
            const existingUser = await User.findById(decode.existingUserId).select("-password")
            req.existingUser = existingUser

            next()
    } catch (error) {
        onsole.log("Error in protectRoutes",error.message)
        return res.status(500).json({message:error.message})
    }
}