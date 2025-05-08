import Course from "../model/course.model.js";

// create Courses
export const createCourse = async(req,res)=>{
    const {title,code,lecturer,time,faculty,department,location}=req.body;
    try {
        const newCourse = await Course.create({
            title,
            code,
            lecturer,
            time,
            location,
            faculty,
            department,
        });
        
        res.status(201).json({
            message: "Course created successfully",
            course: newCourse,
        });
        console.log("Course Request Body:", req.body);
    } catch (error) {
        console.log("Error in creating course",error);
        res.status(500).json("Internal Server Error")
    }
}

// update courses
export const updateCourseBYId = async(req,res)=>{
    const {id} = req.params
    try {
        
        const course = await Course.findByIdAndUpdate(id,req.body)
        if(!course){
            return res.status(400).json("Course Not Found")
        }
        const updatedCourse = await Course.findById(id)
        res.status(200).json({
            message:"Course Updated Succefully",
            updatedCourse
        })
    } catch (error) {
        console.log("Error in updating course",error);
        res.status(500).json("Internal Server Error")
    }
}

// get all courses/classes

export const getAllCourses = async(req,res)=>{
    try {
        const courses = await Course.find()
        res.status(200).json({
            message:"All Course Gotten",
            courses
        })
    } catch (error) {
        console.log("Error in getting all courses",error);
        res.status(500).json("Internal Server Error")
    }
}

// get single course/class

export const getSingleCourse = async(req,res)=>{
    const {id} =req.params
    try {
        const course = await Course.findById(id); // or use: findOne({ _id: id })
        if (!course) {
          return res.status(404).json({ message: "Course not found" });
        }
    
        res.status(200).json({
          message: "Course retrieved successfully",
          course,
        });
    } catch (error) {
        console.log("Error in getting single courses",error);
        res.status(500).json("Internal Server Error")
    }
}

// delete course


export const deleteSingleCourse = async(req,res)=>{
    const {id} = req.params
    try {
        const course = await Course.findByIdAndDelete(id,req.body)
        res.status(200).json({
            message:"Course Deleted Successfully",
            course
        })
    } catch (error) {
        console.log("Error in deleting a courses",error);
        res.status(500).json("Internal Server Error")
    }
}

// delete all courses
export const deleteAllCourses = async(req,res)=>{
    try {
        const course = await Course.findByIdAndDelete()
        res.status(200).json({
            message:"All Courses Deleted Successfully",
            course
        })
    } catch (error) {
        console.log("Error in deleting all courses",error);
        res.status(500).json("Internal Server Error")
    }
}
