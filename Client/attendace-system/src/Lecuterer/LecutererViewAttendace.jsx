import React, { useEffect, useState } from "react";
import { getAttendanceBySession } from "../../connectBackend";

const LecturerViewAttendance = () => {
  const [attendance, setAttendance] = useState([]);
  const sessionId = localStorage.getItem("currentSessionId");

  console.log("LecturerViewAttendance sessionId from localStorage:", sessionId);

  useEffect(() => {
    const fetchAttendance = async () => {
      if (!sessionId) {
        console.error("No sessionId found in localStorage!");
        return;
      }

      try {
        console.log("Fetching attendance for sessionId:", sessionId);
        const data = await getAttendanceBySession(sessionId);
        console.log("Attendance data received:", data);
        setAttendance(data);
      } catch (err) {
        console.error("Error fetching attendance:", err);
      }
    };

    fetchAttendance();
  }, [sessionId]);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Attendance List</h2>
      {attendance.length === 0 ? (
        <p>No attendance marked yet.</p>
      ) : (
        <div className="space-y-2">
          {attendance.map((a) => (
            <div
              key={a._id}
              className="p-2 bg-white rounded shadow flex justify-between"
            >
              <span>{a.student?.name || "No Name"}</span>
              <span>{a.student?.email || "No Email"}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LecturerViewAttendance;
