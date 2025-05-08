import React, { useEffect, useState } from "react";
import { getAllStudent } from "../../connectBackend";
import { Pencil, Trash2, Plus } from "lucide-react";

const ManageStudent = () => {
  const [existingUser, setexistingUser] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await getAllStudent();
        if (response && Array.isArray(response.existingUser)) {
          setexistingUser(response.existingUser);
        } else {
          setexistingUser([]);
          console.warn("Unexpected response:", response);
        }
      } catch (error) {
        console.error("Failed to fetch existingUser:", error);
        setexistingUser([]);
      }
    };
    getAllUsers();
  }, []);

  const handleEdit = (id) => {
    console.log("Edit user with ID:", id);
  };

  const handleDelete = (id) => {
    console.log("Delete user with ID:", id);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Manage Students</h2>
        <button className="mt-4 md:mt-0 flex items-center gap-2 bg-[#00294f] text-white px-4 py-2 rounded-lg hover:bg-[#01427a] transition">
          <Plus size={18} />
          Add Student
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-[#00294f] text-white">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Face Descriptor</th>
              <th className="px-4 py-3">Created At</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {existingUser.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-3">{user.name}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">{user.role}</td>
                <td className="px-4 py-3">{user.faceDescriptor?.length || 0} values</td>
                <td className="px-4 py-3">{new Date(user.createdAt).toLocaleString()}</td>
                <td className="px-4 py-3 flex gap-3">
                  <button
                    onClick={() => handleEdit(user._id)}
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    title="Edit"
                  >
                    <Pencil size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="text-red-600 hover:text-red-800 flex items-center gap-1"
                    title="Delete"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </td>
              </tr>
            ))}
            {existingUser.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageStudent;
