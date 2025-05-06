import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import Admin from "../model/admin.model.js"

dotenv.config()

export const protectRoutesAdmin = async(req,res,next)=>{
    try {
        const token = req.cookies.jwtToken
        if(!token) return res.status(400).json({message:"Unauthorised"})
            const decode = jwt.verify(token,process.env.JWT_SECRET)
            const existingAdmin = await Admin.findById(decode.existingAdminId).select("-password")
            req.existingAdmin = existingAdmin

            next()
    } catch (error) {
        onsole.log("Error in protectRoutes",error.message)
        return res.status(500).json({message:error.message})
    }
}