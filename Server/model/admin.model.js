import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim: true,
    },
    name:{
        type:String,
        required:true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    faculty:{
        type:String,
        required: true,
        trim:true,  
    },
    department:{
        type:String,
        required: true,
        trim:true,  
    }
},{
    timestamps:true
})

const Admin = mongoose.model("Admin",adminSchema)

export default Admin;