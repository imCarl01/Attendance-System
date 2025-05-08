import Course from "../model/course.model.js";

export const createCourse = async(req,res)=>{
    const {title,code,lecturer,time,faculty,department,location}=req.body;
    try {
        const course = await Course.create(req.body)
        if(!course){
            return res.status(400).json("Course dont exist")
        }
        const newCourse = new Course({
            title,
            code,
            lecturer,
            time,
            location,
            faculty,
            department,
        })
        await newCourse.save()
        res.status(200).json({
            message:"Course created successfully",
            newCourse
        })
    } catch (error) {
        console.log("Error in creating course",error);
        res.status(500).json("Internal Server Error")
    }
}

export const updateCourseBYId = async(req,res)=>{
    const {id} = req.params
    try {
        
        const course = await Course.findByIdAndUpdate(id)
        if(!course){
            return res.status(400).json("Course Not Found")
        }
        const updatedCourse = await Course.findByIdAndUpdate(id)
        res.status(200).json({
            message:"Course Updated Succefully",
            updatedCourse
        })
    } catch (error) {
        console.log("Error in updating course",error);
        res.status(500).json("Internal Server Error")
    }
}