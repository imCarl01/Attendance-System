import express from "express";
import { login, logout, profile, register } from "../controllers/user.controller.js";
import { protectRoutes } from "../middleware/protectRoute.js";

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)
router.get("/profile",protectRoutes, profile)

export default router