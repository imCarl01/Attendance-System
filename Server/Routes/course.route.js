import express from "express";
import { createCourse, deleteAllCourses, deleteSingleCourse, getAllCourses, getSingleCourse, updateCourseBYId } from "../controllers/course.controller.js";



const router = express.Router()

router.post("/createCourse", createCourse)
router.put("/updateCourseBYId/:id", updateCourseBYId)
router.get("/getAllCourses", getAllCourses)
router.get("/getSingleCourse/:id", getSingleCourse)
router.delete("/deleteSingleCourse/:id", deleteSingleCourse)
router.delete("/deleteAllCourses", deleteAllCourses)


export default router