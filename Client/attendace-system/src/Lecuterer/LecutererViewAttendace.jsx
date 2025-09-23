import React, { useEffect, useState } from "react";
import { getAttendanceBySession } from "../../connectBackend";

const LecturerViewAttendance = () => {
  const [attendanceList, setAttendanceList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const sessionId = localStorage.getItem("currentSessionId");
        console.log("LecturerViewAttendance sessionId from localStorage:", sessionId);

        if (!sessionId) {
          console.error("No sessionId found in localStorage!");
          setLoading(false);
          return;
        }

        console.log("Fetching attendance for sessionId:", sessionId);
        const response = await getAttendanceBySession(sessionId);

        console.log("Attendance data received:", response);

        if (Array.isArray(response)) {
          setAttendanceList(response);
        } else {
          console.warn("Attendance response is not an array:", response);
          setAttendanceList([]);
        }
      } catch (error) {
        console.error("Error fetching attendance:", error);
        setAttendanceList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h2 className="text-2xl font-bold mb-4">Attendance Records</h2>
      {loading ? (
        <p>Loading attendance...</p>
      ) : attendanceList.length === 0 ? (
        <p>No attendance records found for this session.</p>
      ) : (
        <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-2 px-4">#</th>
              <th className="py-2 px-4">Student Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Course Code</th>
              <th className="py-2 px-4">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {attendanceList.map((record, index) => (
              <tr key={record._id} className="border-b">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{record.student?.name || "Unknown"}</td>
                <td className="py-2 px-4">{record.student?.email || "Unknown"}</td>
                <td className="py-2 px-4">{record.courseCode}</td>
                <td className="py-2 px-4">{new Date(record.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LecturerViewAttendance;
