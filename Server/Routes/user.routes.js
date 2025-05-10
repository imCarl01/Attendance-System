import express from "express";
import { deleteAllUser, deleteSingleUser, getSingleUser, login, logout, profile, register, updateUserBYId } from "../controllers/user.controller.js";
import { protectRoutes } from "../middleware/protectRoute.js";
import { getAllLecturers, getAllStudents } from "../controllers/user.controller.js";
const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)
router.get("/profile",protectRoutes, profile)
router.get("/getAllStudent", getAllStudents)
router.put("/updateUserBYId/:id",updateUserBYId)
router.get("/getSingleUser/:id",getSingleUser)
router.delete("/deleteSingleUser/:id",deleteSingleUser)
router.delete("/deleteAllUser",deleteAllUser)
router.get("/getAllLecturers", getAllLecturers)
export default router