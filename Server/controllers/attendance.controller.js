import Attendance from "../model/attendance.model.js";
import User from "../model/user.model.js";
import jwt from "jsonwebtoken";
import AttendanceSession from "../model/attendanceSession.model.js";
import dotenv from "dotenv"

dotenv.config();
export const generateQRCode = async (req, res) => {
  try {
    console.log("👉 Incoming request to /generateQR");
    console.log("👉 Headers:", req.headers);
    console.log("👉 Body received:", req.body);

    const { courseId, lecturerId } = req.body;

    if (!courseId || !lecturerId) {
      console.error("❌ Missing required fields:", { courseId, lecturerId });
      return res
        .status(400)
        .json({ message: "courseId and lecturerId are required" });
    }

    // Create a new AttendanceSession
    const session = new AttendanceSession({
      courseId,
      lecturerId,
      currentToken: "", // will fill below
      expiresAt: new Date(Date.now() + 30 * 1000), // 30s expiry
      isActive: true,
    });

    // Create JWT that encodes session + course
    const token = jwt.sign(
      { sessionId: session._id, courseId },
      process.env.QR_SECRET,
      { expiresIn: "30s" }
    );

    session.currentToken = token;
    await session.save();

    console.log("✅ QR code generated successfully:", token);

    res.json({ code: token, sessionId: session._id });
  } catch (err) {
    console.error("❌ Error in generateQRCode:", err.message);
    res.status(500).json({ message: "Failed to generate QR", error: err.message });
  }
};

export const markAttendance = async (req, res) => {
  try {
    const { code, studentId } = req.body;

    // const decoded = decodeCode(code);
    // Verify token
    const decoded = jwt.verify(code, process.env.QR_SECRET);

    const session = await AttendanceSession.findById(decoded.sessionId);
    if (!session || !session.isActive) {
      return res.status(400).json({ message: "Invalid or inactive session" });
    }

    // Check expiry
    if (session.expiresAt < new Date()) {
      return res.status(401).json({ message: "QR code expired" });
    }

    const user = await User.findById(studentId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Checking if already marked in this session
    // const alreadyMarked = await Attendance.findOne({
    //   user: user._id,
    //   courseCode: decoded.courseCode,
    //   date: { $gte: startOfToday(), $lte: endOfToday() }
    // });

    const alreadyMarked = await Attendance.findOne({
      student: user._id,
      sessionId: session._id,
    });

    if (alreadyMarked) {
      return res.status(409).json({ message: "Attendance already marked" });
    }

    // set new attendace
    const newAttendance = new Attendance({
      student: user._id,
      courseCode: decoded.courseId, // store actual courseId instead of code if you prefer
      sessionId: session._id,
    });

    await newAttendance.save();

    res.status(200).json({ message: "Attendance marked successfully" });
  } catch (err) {
    console.error(err);
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "QR code expired" });
    }
    res.status(500).json({ message: "Server error" });
  }
};

export const getAttendaceBySession =  async (req, res) => {
  try {
    const records = await Attendance.find({
      sessionId: req.params.sessionId,
    }).populate("student", "name email");

    res.json(records);
  } catch (err) {
    res.status(500).json({ message: "Error fetching attendance" });
  }
};