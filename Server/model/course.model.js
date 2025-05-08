import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    code:{
        type:String,
        required:true,
        trim:true
    },
    lecturer:{
        type:String,
        required:true,
        trim:true
    },
    location:{
        type:String,
        required:true,
        trim:true
    },
    time:{
        start:{
            type:String,
            required:true,
            trim:true,
            uppercase:true
        },
        endtime:{
            type:String,
            required:true,
            trim:true,
            uppercase:true
        },
        day:{
            type:String,
            required:true,
            enum:['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
        },
    },
   
    faculty:{
        type:String,
        required: true,
        enum:['Engineering', 'Science', 'Business', 'Arts', 'Medical', 'Law']
    },
    department:{
        type:String,
        required: true,
        trim:true,  
    },

},{
    timestamps:true
});

const Course = mongoose.model("course", courseSchema)

export default Course;
