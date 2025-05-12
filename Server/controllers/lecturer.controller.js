import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Lecturer from "../model/lecturer.model.js";
import generateLecturerCookie from "../lib/generateLecturerCookie.js";


// const router = express.Router()
dotenv.config();

export const registerLecturer = async (req, res) => {
    const {title,name,email,password,faculty,department} = req.body;
   try {

    if(title,!name || !email || !password || !faculty || !department){
        return res.status(400).json({message:"Please fill all the fields"})
    }

    const existingLecturer = await Lecturer.findOne({email})

    if(existingLecturer){
        return res.status(400).json({message:"Lecturer already exist"})
    }
    
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)
    const newLecturer = new Lecturer({
        title,
        name,
        email,
        password:hashedPassword,
        faculty,
        department,
    })
    await newLecturer.save()
    res.status(201).json({message:"Lecturer Created Successfully"})
   } catch (error) {
    console.error("Regsitration Failed",error)
    res.status(500).json({message:"Internal Server Error"})
   }
}

export const loginLecturer = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingLecturer = await Lecturer.findOne({ email });

        if (!existingLecturer) {
            return res.status(400).json({ message: "Lecturer not found" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingLecturer.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = generateLecturerCookie(existingLecturer, res);
        res.status(200).json({ 
            token, 
            user: existingLecturer, 
            message: "Login Successful" });
        
    } catch (error) {
        console.error("Login Failed", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const logoutLecturer = async(req,res)=>{
    try {
        res.cookie("jwtToken","",{maxAge:1})
        res.status(200).json("Logout Successfull")
    } catch (error) {
        console.log("Error in Logout Lecturer", error)
        res.status(500).json("Internal Server Error")
    }
}
export const profileLecturer = async (req, res) => {
    try {
        const existingLecturer = await Lecturer.findById(req.existingLecturer._id).select("-password");
        if (!existingLecturer) {
            return res.status(404).json({ message: "Lecturer not found" });
        }
        res.status(200).json({ existingLecturer });
    } catch (error) {
        console.error("Profile Fetch Failed", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}



// get All Lecturers
export const getAllLecturers = async(req,res)=>{
    try {
        const existingLecturer =await Lecturer.find({role:"lecturer"})
        if(!existingLecturer){
            return res.status(400).json("No Lecturer Found")
        }
        res.status(200).json({success:true,existingLecturer})
    } catch (error) {
        console.error("Error Fetching all Lecturers", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// handling CRUD opration 

 //i'll use register for the createLecturer

// update user
export const updateLecturerBYId = async(req,res)=>{
    const {id} = req.params
    try {
        
        const existingLecturer = await Lecturer.findByIdAndUpdate(id,req.body)
        if(!existingLecturer){
            return res.status(400).json("Lecturer Not Found")
        }
        const updatedLecturer = await Lecturer.findById(id)
        res.status(200).json({
            message:"Lecturer Updated Succefully",
            updatedLecturer
        })
    } catch (error) {
        console.log("Error in updating user",error);
        res.status(500).json("Internal Server Error")
    }
}


// get single Lecturer


export const getSingleLecturer = async(req,res)=>{
    const {id} = req.params
    try {
        const existingLecturer = await Lecturer.findById(id);
        if (!existingLecturer) {
          return res.status(404).json({ message: "Lecturer not found" });
        }
    
        res.status(200).json({
          message: "Lecturer retrieved successfully",
          existingLecturer
        });
    } catch (error) {
        console.log("Error in getting single user",error);
        res.status(500).json("Internal Server Error")
    }
}

// delete user

export const deleteSingleLecturer = async(req,res)=>{
    const {id} = req.params
    try {
        const existingLecturer = await Lecturer.findByIdAndDelete(id,req.body)
        res.status(200).json({
            message:"Course Deleted Successfully",
            existingLecturer
        })
    } catch (error) {
        console.log("Error in deleting a user",error);
        res.status(500).json("Internal Server Error")
    }
}

// delete all user
export const deleteAllLecturer= async(req,res)=>{
    try {
        const existingLecturer = await Lecturer.deleteMany()
        res.status(200).json({
            message:"All Courses Deleted Successfully",
            existingLecturer
        })
    } catch (error) {
        console.log("Error in deleting all courses",error);
        res.status(500).json("Internal Server Error")
    }
}

