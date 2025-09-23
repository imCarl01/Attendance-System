import React, { useEffect, useState } from "react";
import { getAttendanceBySession } from "../../connectBackend";


const LecturerAttendanceView = ({ sessionId }) => {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAttendanceBySession(sessionId);
      setAttendance(res);
    };
    fetchData();
  }, [sessionId]);

  return (
    <div>
      <h2 className="text-xl font-bold">Attendance Records</h2>
      <ul>
        {attendance.map((record) => (
          <li key={record._id}>
            {record.student.name} ({record.student.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LecturerAttendanceView;
