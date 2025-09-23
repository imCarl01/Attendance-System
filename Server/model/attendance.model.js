import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  courseCode: {
    type: String,
    required: true,
  },
    sessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AttendanceSession",
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['Present', 'Absent'],
    default: 'Present',
  },
}, {
  timestamps: true,
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

export default Attendance;
