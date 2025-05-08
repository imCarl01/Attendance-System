import express from "express";
import { createCourse, updateCourseBYId } from "../controllers/course.controller.js";



const router = express.Router()

router.post("/createCourse", createCourse)
router.put("/updateCourseBYId/:id", updateCourseBYId)


export default router