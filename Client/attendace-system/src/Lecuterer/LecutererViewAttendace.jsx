import React, { useEffect, useState } from "react";
import axios from "axios";

const LecturerAttendanceView = ({ sessionId }) => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await axios.get(
          `https://attendance-system-w2la.onrender.com/api/attendance/session/${sessionId}`
        );
        setRecords(res.data);
      } catch (err) {
        console.error("Error fetching attendance:", err);
      }
    };

    fetchAttendance();
  }, [sessionId]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Attendance Records</h2>
      {records.length === 0 ? (
        <p>No students marked yet.</p>
      ) : (
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Student</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Time</th>
            </tr>
          </thead>
          <tbody>
            {records.map((rec) => (
              <tr key={rec._id}>
                <td className="border px-4 py-2">{rec.student?.name}</td>
                <td className="border px-4 py-2">{rec.student?.email}</td>
                <td className="border px-4 py-2">
                  {new Date(rec.createdAt).toLocaleTimeString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LecturerAttendanceView;
