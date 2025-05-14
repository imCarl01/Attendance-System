import React, { useEffect, useState } from 'react';
import { profileLecturer, getLecturerCourse } from '../../connectBackend';
import { Edit2, Trash2 } from 'lucide-react'; // Assuming you’re using lucide icons
import { useNavigate } from 'react-router-dom';

const LecturerClassSection = () => {
  const [lecturer, setLecturer] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch lecturer profile
  const getLecturerProfile = async () => {
    try {
      const response = await profileLecturer();
      const existingLecturer = response?.existingLecturer;

      if (existingLecturer && existingLecturer._id) {
        setLecturer(existingLecturer);
        localStorage.setItem("existingLecturer", JSON.stringify(existingLecturer));

        // Now fetch the courses using the lecturer's ID
        const courseResponse = await getLecturerCourse(existingLecturer._id);
        setCourses(courseResponse.courses || []);
      }
    } catch (error) {
      console.error("Error fetching lecturer profile or courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLecturerProfile();
  }, []);

//   const handleEditClick = (course) => {
//     console.log("Edit clicked for course:", course);
//     // Implement modal or navigation to edit form
//   };

//   const handleDeleteSingleLecturer = (courseId) => {
//     console.log("Delete clicked for course:", courseId);
//     // Implement course deletion logic
//   };

    const handleSetAttendance = (course) => {
        navigate("/lecturerdashboard/takeAttendance",{state:{course}})
    }

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        Lecturer Classes {lecturer?.name && `- ${lecturer.name}`}
      </h2>
      {courses.length === 0 ? (
        <p className="text-gray-600">No courses assigned yet.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Title</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Code</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Location</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Date</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Department</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Set Attendance</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Record</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course._id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-4 text-sm text-gray-900">{course?.title}</td>
                <td className="px-4 py-4 text-sm text-gray-900">{course?.code}</td>
                <td className="px-4 py-4 text-sm text-gray-900">{course?.location}</td>
                <td className="px-4 py-4 text-sm text-gray-900">
                  {course?.time?.day} | {course?.time?.start} - {course?.time?.endtime}
                </td>
                <td className="px-4 py-4 text-sm text-gray-900">{course?.department}</td>
                <td className="px-4 py-4 text-sm">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleSetAttendance(course)}
                     className="bg-[#00294f] text-[#fff] font-bold flex justify-center items-center px-4 py-2 rounded cursor-pointer"
                    >
                      Set Attendance
                    </button>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-gray-900">30/70</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LecturerClassSection;
