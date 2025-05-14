import React, { useEffect, useState } from "react";
import { Plus, X, Search, Edit2, Trash2 } from "lucide-react";
import { createCourse, deleteSingleCourse, getAllCourses, updateCourseBYId } from "../../connectBackend";

const HandleClasses = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState();
  const [courseCode, setCourseCode] = useState();
  const [lecturer, setLecturer] = useState();
  const [time, setTime] = useState();
  const [location, setLocation] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [facultyData, setFacultyData] = useState({ faculty: "" });
  const [departmentData, setDepartmentData] = useState({ department: "" });
  const [courseDate, setCourseDate] = useState({ date: "" });
  const [courses, setAllCourses] = useState([]);
  const [isEditing, setIsEditing] = useState(false)
  const [editingCourseId,setEditingCourseId] =useState(null)
  
  //get all courses

  const getTheCourse = async () => {
    try {
      const response = await getAllCourses();
      console.log("Courses gotten successfull", response);
      if (response && Array.isArray(response.courses)) {
        setAllCourses(response.courses);
        console.log("Courses in state:", response.courses);
      } else {
        // setAllCourses([])
        console.warn("Unexpected responses", response);
      }
    } catch (error) {
      console.error("Error getting all course:", error);
      // setAllCourses([])
    }
  };

  useEffect(() => {
    getTheCourse();
  }, []);


  // handleEdit once clicked
  const handleEditClick = (courses)=>{
    // console.log("Edit clicked");
    setIsEditing(true);
    setEditingCourseId(courses._id);
    setTitle(courses.title);
    setLecturer(
      typeof courses.lecturer === "object" ? courses.lecturer._id : courses.lecturer
    )
    setLocation(courses.location);
    setStartTime(courses.time.start);
    setEndTime(courses.time.endtime);
    setCourseDate({ day: courses.time.day });
    setFacultyData({ faculty: courses.faculty });
    setDepartmentData({ department: courses.department });
    setIsModalOpen(true);
  }

  const resetForm = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setEditingCourseId(null);
    setTitle("");
    setCourseCode("");
    setLecturer("");
    setLocation("");
    setStartTime("");
    setEndTime("");
    setCourseDate({ day: "" });
    setFacultyData({ faculty: "" });
    setDepartmentData({ department: "" });
  };


  // create new course
  const handleSubmitCourse = async (e) => {
    e.preventDefault();

    if (
      !title ||
      !courseCode ||
      !lecturer ||
      !location ||
      !startTime ||
      !endTime ||
      !facultyData.faculty ||
      !departmentData.department ||
      !courseDate
    ) {
      alert("Please Fill in all details");
      return null;
    }

    const courseData = {
      title,
      code: courseCode,
      lecturer,
      location,
      time: {
        start: startTime,
        endtime: endTime,
        day: courseDate.day,
      },
      faculty: facultyData.faculty,
      department: departmentData.department,
    };

    try {
      if(isEditing){
        await updateCourseBYId(editingCourseId, courseData);
        alert("Course updated successfully");
      }else {
        console.log("Sending course data:", courseData);
        await createCourse(courseData);
        alert("Course created successfully");
      }
      await getTheCourse();
      resetForm();
    
    } catch (error) {
      console.error("Error creating course:", error);
      // setError("Invalid email or password");
    }
  };

  const handleDeleteSingleCourse=async (id)=>{
    try {
      const deleteCourse = await deleteSingleCourse(id)
      if(deleteCourse){
        setAllCourses(courses.filter((courses)=>courses._id !== id))
        alert("Course Deleted Successfully")
      }

    } catch (error) {
      console.error("Error deleting course:", error);
    }
    
  }

  
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleChangeFaculty = (e) => {
    setFacultyData({ faculty: e.target.value });
  };

  const handleChangeDepartment = (e) => {
    setDepartmentData({ department: e.target.value });
  };

  const handleDate = (e) => {
    setCourseDate({ day: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="container mx-auto p-4 md:p-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h2 className="text-2xl font-semibold text-[#00294f]">
              Manage Classes
            </h2>

            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <input
                  type="text"
                  placeholder="Search classes..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00294f]/50"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>

              <button
                onClick={toggleModal}
                className="flex items-center justify-center gap-2 bg-[#00294f] text-white px-4 py-2 rounded-lg hover:bg-[#003a6d] transition-colors duration-200"
              >
                <Plus size={18} />
                <span>Create New Class</span>
              </button>
            </div>
          </div>

          {/* Classes Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Title
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Code
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Lecturer
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Day
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Time
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 hidden lg:table-cell">
                    Faculty
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 hidden md:table-cell">
                    Department
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 hidden lg:table-cell">
                    Location
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {courses.length > 0 ? (
                  courses.map((courses) => (
                    <tr
                      key={courses._id}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="px-4 py-4 text-sm text-gray-900">
                        {courses.title}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">
                        {courses.code}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">
  {typeof courses.lecturer === "object" ? courses.lecturer.name : courses.lecturer}
</td>
                      <td className="px-4 py-4 text-sm text-gray-600">
                        {courses.time.day}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">
                        {courses.time.start} - {courses.time.endtime}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600 hidden lg:table-cell">
                        {courses.faculty}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600 hidden md:table-cell">
                        {courses.department}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600 hidden lg:table-cell">
                        {courses.location}
                      </td>
                      <td className="px-4 py-4 text-sm">
                        <div className="flex items-center space-x-3">
                          <button onClick={()=>handleEditClick(courses)} className="text-blue-600 hover:text-blue-800">
                            <Edit2 size={16} />
                          </button>
                          <button onClick={()=>handleDeleteSingleCourse(courses._id)} className="text-red-600 hover:text-red-800">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center text-gray-600 py-4">
                      No courses available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <p className="text-sm text-gray-600">Showing 1-3 of 3 classes</p>
            <div className="flex space-x-1">
              <button className="px-3 py-1 rounded border border-gray-300 text-sm hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1 rounded bg-[#00294f] text-white text-sm">
                1
              </button>
              <button className="px-3 py-1 rounded border border-gray-300 text-sm hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Add Class Modal */}
      {isModalOpen && (
        <form action="" onSubmit={handleSubmitCourse}>
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-[#00294f]">
                  Add New Class
                </h3>
                <button
                  onClick={toggleModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Course Title
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00294f]/50"
                      placeholder="Enter course title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Course Code
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00294f]/50"
                      placeholder="e.g. CSC101"
                      value={courseCode}
                      onChange={(e) => setCourseCode(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Lecturer ID
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00294f]/50"
                      placeholder="Enter lecturer ID"
                      value={lecturer}
                      onChange={(e) => setLecturer(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Time
                      </label>
                      <input
                        type="time"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00294f]/50"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        End Time
                      </label>
                      <input
                        type="time"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00294f]/50"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Day
                    </label>
                    <select
                      name="day"
                      value={courseDate.day}
                      onChange={handleDate}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00294f]/50"
                    >
                      <option value="">Select Day</option>
                      <option value="Monday">Monday</option>
                      <option value="Tuesday">Tuesday</option>
                      <option value="Wednesday">Wednesday</option>
                      <option value="Thursday">Thursday</option>
                      <option value="Friday">Friday</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Faculty
                    </label>
                    <select
                      name="faculty"
                      value={facultyData.faculty}
                      onChange={handleChangeFaculty}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00294f]/50"
                    >
                      <option value="">Select Faculty</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Science">Science</option>
                      <option value="Business">Business</option>
                      <option value="Arts">Arts</option>
                      <option value="Medical">Medical</option>
                      <option value="Law">Law</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Department
                    </label>
                    <select
                      name="department"
                      value={departmentData.department}
                      onChange={handleChangeDepartment}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00294f]/50"
                    >
                      <option value="">Select Department</option>
                      <option value="Computer Science">Computer Science</option>
                      <option value="Electrical Engineering">
                        Electrical Engineering
                      </option>
                      <option value="Computer Engineering">
                        Computer Engineering
                      </option>
                      <option value="Economics">Economics</option>
                      <option value="Chemistry">Chemistry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00294f]/50"
                      placeholder="Enter class location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end p-4 border-t border-gray-200 gap-2">
                <button
                  onClick={toggleModal}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#00294f] text-white rounded-md hover:bg-[#003a6d] transition-colors duration-200"
                >
                  Add Class
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default HandleClasses;
