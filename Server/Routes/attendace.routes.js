import express from 'express';
import { generateQRCode, getAttendaceBySession, markAttendance } from '../controllers/attendance.controller.js';

const router = express.Router();

router.post("/markAttendance", markAttendance);
router.post("/generateQR", generateQRCode)
router.get("/session/:sessionId", getAttendaceBySession)
export default router;