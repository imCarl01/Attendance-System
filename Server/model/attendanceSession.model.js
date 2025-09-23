
import mongoose from "mongoose";

const AttendanceSessionSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    lecturerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lecturer",
      required: true,
    },
    currentToken: { type: String, required: true }, // rotating token (JWT)
    expiresAt: { type: Date, required: true }, // when QR expires
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const AttendanceSession = mongoose.model(
  "AttendanceSession",
  AttendanceSessionSchema
);

export default AttendanceSession;
