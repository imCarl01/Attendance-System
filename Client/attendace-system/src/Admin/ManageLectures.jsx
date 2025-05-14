import React, { useEffect, useState } from "react";
import {
  deleteSingleLecturer,
  deleteSingleUser,
  getAllLecturers,
  getAllStudent,
  registerLecturer,
  updateLecturerBYId,
  updateUserBYId,
} from "../../connectBackend";
import { Pencil, Trash2, Plus } from "lucide-react";
import { X, Search, Edit2 } from "lucide-react";

const ManageLectures = () => {
  const [existingLecturer, setexistingLecturer] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [facultyData, setFacultyData] = useState({ faculty: "" });
  const [departmentData, setDepartmentData] = useState({ department: "" });
  const [password, setPassword] = useState();
  const [lecturer, setUser] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [editingLecturerId, setEditingLecturerId] = useState(null);

  const getAllInstructor = async () => {
    try {
      const response = await getAllLecturers();
      if (response && Array.isArray(response.existingLecturer)) {
        setexistingLecturer(response.existingLecturer);
        console.log("Existing lecturer", response.existingLecturer);
      } else {
        setexistingLecturer([]);
        console.warn("Unexpected response:", response);
      }
    } catch (error) {
      console.error("Failed to fetch existingLecturer:", error);
      setexistingLecturer([]);
    }
  };

  useEffect(() => {
    getAllInstructor();
  }, []);

  // handleEdit once clicked
  const handleEditClick = (lecturer) => {
    console.log("Edit clicked");
    setIsEditing(true);
    setEditingLecturerId(lecturer._id);
    setTitle(lecturer.title);
    setName(lecturer.name);
    setEmail(lecturer.email);
    setDepartmentData({ department: lecturer.department });
    setFacultyData({ faculty: lecturer.faculty });
    setPassword(""); // prefill not
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setEditingLecturerId(null);
    setIsEditing(false);
    setIsModalOpen(false);
    setTitle("");
    setName("");
    setEmail("");
    setPassword("")
    setFacultyData({ faculty: "" });
    setDepartmentData({ department: "" });
  };

  const handleUpdate = async () => {
    if (!title || !name || !email || !departmentData || !facultyData) {
      alert("Please fill up all details");
      return;
    }

    const updatedData = {
      title,
      name,
      password,
      email,
      faculty: facultyData.faculty,
      department: departmentData.department,
    };
    try {
      if (isEditing) {
        await updateLecturerBYId(editingLecturerId, updatedData);
        alert("Lecturer updated Successfully");
      } else {
        await registerLecturer(updatedData);
        alert("Lecturer Created Successfully");
      }
      await getAllInstructor();
      resetForm();
      // Reset the form and close the modal
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update lecturer.");
    }
  };

  const handleDeleteSingleLecturer = async (id) => {
    try {
      const deleteLecturer = await deleteSingleLecturer(id);
      if (deleteLecturer) {
        setexistingLecturer(
          existingLecturer.filter((lecturer) => lecturer._id !== id)
        );
        alert("Lecturer Deleted Successfully");
      }
    } catch (error) {
      console.error("Error deleting lecturer:", error);
    }
  };

  const handleChangeFaculty = (e) => {
    setFacultyData({faculty: e.target.value});
  };
  const handleChangeDepartment = (e) => {
    setDepartmentData({department: e.target.value});
  };
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="container mx-auto p-4 md:p-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h2 className="text-2xl font-semibold text-[#00294f]">
              Manage Lecturer
            </h2>

            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <input
                  type="text"
                  placeholder="Search students..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00294f]/50"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>

              <button
                onClick={toggleModal}
                className="flex items-center justify-center gap-2 bg-[#00294f] text-white px-4 py-2 rounded-lg hover:bg-[#003a6d] transition-colors duration-200"
              >
                <Plus size={18} />
                <span>Create Lecturer</span>
              </button>
            </div>
          </div>

          {/* Students Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-100">
                <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    ID
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Title
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Email
                  </th>
                  {/* <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Role
                  </th> */}
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Faculty
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 hidden lg:table-cell">
                    Department
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {existingLecturer.length > 0 ? (
                  existingLecturer.map((lecturer) => (
                    <tr
                      key={lecturer._id}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                         <td className="px-4 py-4 text-sm text-gray-900">
                        {lecturer._id}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900">
                        {lecturer.title}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900">
                        {lecturer.name}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">
                        {lecturer.email}
                      </td>
                      {/* <td className="px-4 py-4 text-sm text-gray-600">
                        {lecturer.role}
                      </td> */}
                      <td className="px-4 py-4 text-sm text-gray-600">
                        {lecturer.faculty}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">
                        {lecturer.department}
                      </td>
                      <td className="px-4 py-4 text-sm">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => handleEditClick(lecturer)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteSingleLecturer(lecturer._id)
                            }
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center text-gray-600 py-4">
                      No Lecturer available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <p className="text-sm text-gray-600">
              Showing {existingLecturer.length > 0 ? 1 : 0}-
              {existingLecturer.length} of {existingLecturer.length} Students
            </p>
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

      {/* Add Student Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-[#00294f]">
                Create Lecturer
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
                    Title
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00294f]/50"
                    placeholder="Mr, Mrs, Dr, Prof, "
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00294f]/50"
                    placeholder="Enter Lecturer Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00294f]/50"
                    placeholder="Enter Lecturer email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00294f]/50"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {/* <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <input
                    type="role"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00294f]/50"
                    placeholder="role"
                    value={role}
                    onChange={(e)=>setRole(e.target.value)}
                  />
                </div> */}

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
                    <option value="Economics">Economics</option>
                    <option value="Chemistry">Chemistry</option>
                  </select>
                </div>

                {/* <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Face Recognition
                  </label>
                  <div className="border border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center">
                    <div className="w-32 h-32 bg-gray-100 rounded-full mb-2 flex items-center justify-center">
                      <span className="text-gray-400">No image</span>
                    </div>
                    <button className="mt-2 text-sm px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md">
                      Capture Face
                    </button>
                  </div>
                </div> */}
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
                onClick={handleUpdate}
                className="px-4 py-2 bg-[#00294f] text-white rounded-md hover:bg-[#003a6d] transition-colors duration-200"
              >
                {isEditing ? "Update Lecturer" : "Create Lecturer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageLectures;
