import React, { useEffect, useState } from "react";
import { getAllStudent } from "../../connectBackend";

const ManageStudent = () => {
  const [existingUser, setexistingUser] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await getAllStudent();
        if (response && Array.isArray(response.existingUser)) {
          setexistingUser(response.existingUser);
        } else {
          setexistingUser([]); // fallback to empty array
          console.warn("Unexpected response:", response);
        }
      } catch (error) {
        console.error("Failed to fetch existingUser:", error);
        setexistingUser([]);
      }
    };
    getAllUsers();
  }, []);
  
  return (
    <div className="p-4">
    <h2 className="text-2xl font-bold mb-4">All existingUser</h2>
    <div className="overflow-x-auto">
      <table className="min-w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Face Descriptor</th>
            <th className="border p-2">Created At</th>
            <th className="border p-2">Updated At</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {existingUser.map((existingUser) => (
            <tr key={existingUser._id}>
              <td className="border p-2">{existingUser.name}</td>
              <td className="border p-2">{existingUser.email}</td>
              <td className="border p-2">{existingUser.role}</td>
              <td className="border p-2">{existingUser.faceDescriptor?.length || 0} values</td>
              <td className="border p-2">{new Date(existingUser.createdAt).toLocaleString()}</td>
              <td className="border p-2">{new Date(existingUser.updatedAt).toLocaleString()}</td>
              <td className="border p-2 space-x-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  onClick={() => handleEdit(existingUser._id)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  onClick={() => handleDelete(existingUser._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {existingUser.length === 0 && (
            <tr>
              <td colSpan="7" className="text-center p-4">
                No existingUser found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
  ) 
};

export default ManageStudent;
