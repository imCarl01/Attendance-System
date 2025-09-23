import express from 'express';
import { generateQRCode, markAttendance } from '../controllers/attendance.controller.js';

const router = express.Router();

router.post("/markAttendance", markAttendance);
router.post("/generateQR", generateQRCode)
export default router;