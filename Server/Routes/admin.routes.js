import express from "express";
import { protectRoutes } from "../middleware/protectRoute.js";
import { adminProfile, loginAdmin, logoutAdmin, registerAdmin } from "../controllers/admin.controller.js";

const router = express.Router()

router.post("/registerAdmin", registerAdmin)
router.post("/loginAdmin", loginAdmin)
router.post("/logoutAdmin", logoutAdmin)
router.get("/adminProfile",protectRoutes, adminProfile)

export default router