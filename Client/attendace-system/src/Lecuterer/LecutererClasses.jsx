import React, { useEffect, useState } from 'react';
import { getLecturerCourse } from '../../connectBackend';

const LecturerClasses = ({ lecturerId }) => {
  const [courses, setCourses] = useState([]);

  const fetchLecturerCourses = async () => {
    try {
      const res = await getLecturerCourse(lecturerId);
      setCourses(res.courses);
    } catch (error) {
      console.error('Error fetching lecturer courses:', error);
    }
  };

  useEffect(() => {
    if (lecturerId) {
      fetchLecturerCourses();
    }
  }, [lecturerId]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Courses for this Lecturer</h2>
      {courses.length === 0 ? (
        <p>No courses assigned yet.</p>
      ) : (
        <ul className="space-y-2">
          {courses.map((course, index) => (
            <li key={index} className="border p-3 rounded shadow-sm">
              <p><strong>Title:</strong> {course.title}</p>
              <p><strong>Code:</strong> {course.code}</p>
              <p><strong>Location:</strong> {course.location}</p>
              <p><strong>Time:</strong> {course.time.day} | {course.time.startTime} - {course.time.endTime}</p>
              <p><strong>Department:</strong> {course.department}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LecturerClasses;
