import express from "express";
import { adminProfile, loginAdmin, logoutAdmin, registerAdmin } from "../controllers/admin.controller.js";
import { protectRoutesAdmin } from "../middleware/protectRouteAdmin.js";


const router = express.Router()

router.post("/registerAdmin", registerAdmin)
router.post("/loginAdmin", loginAdmin)
router.post("/logoutAdmin", logoutAdmin)
router.get("/adminProfile",protectRoutesAdmin, adminProfile)

export default router