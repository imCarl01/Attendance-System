import express from "express";
import {
  deleteAllLecturer,
  deleteSingleLecturer,
  getAllLecturers,
  getSingleLecturer,
  loginLecturer,
  logoutLecturer,
  profileLecturer,
  registerLecturer,
  updateLecturerBYId,
} from "../controllers/lecturer.controller.js";
import { protectRouteLecturer } from "../middleware/protectRouteLecturer.js";
const router = express.Router();

router.post("/registerLecturer", registerLecturer);
router.post("/loginlecturer", loginLecturer);
router.post("/logoutlecturer", logoutLecturer);
router.get("/getAllLecturers", getAllLecturers);
router.get("/profileLecturer", protectRouteLecturer, profileLecturer);
router.put("/updateLecturerBYId/:id", updateLecturerBYId);
router.get("/getSingleLecturer/:id", getSingleLecturer);
router.delete("/deleteSingleLecturer/:id", deleteSingleLecturer);
router.delete("/deleteAllLecturer", deleteAllLecturer);

export default router;
