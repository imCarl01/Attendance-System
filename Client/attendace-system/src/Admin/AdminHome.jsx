import React, { use, useEffect, useState } from "react";
import { adminProfile, getAllLecturers, getAllStudent } from "../../connectBackend";
import AdminCard from "./AdminCard";
import AdminChart from "./AdminChart";

const AdminHome = () => {
  const [existingAdmin, setExistingAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
   const [existingUser, setexistingUser] = useState([]);
   const [existingLecturer, setexistingLecturer] = useState([]);
   const [total, setTotal] = useState(0);
  const getAdminProfile = async () => {
    try {
      const response = await adminProfile();
      if (response) {
        setExistingAdmin(response.existingAdmin);
        localStorage.setItem("existingAdmin", JSON.stringify(response.existingAdmin));
      }
    } catch (error) {
      console.error("Error fetching AdminProfile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAdminProfile();
  }, []);

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

      const getAllUsers = async () => {
        try {
          const response = await getAllStudent();
          if (response && Array.isArray(response.existingUser)) {
            setexistingUser(response.existingUser);
            console.log("Existing user", response.existingUser);
          } else {
            setexistingUser([]);
            console.warn("Unexpected response:", response);
          }
        } catch (error) {
          console.error("Failed to fetch existingUser:", error);
          setexistingUser([]);
        }
      };
    
      useEffect(() => {
        getAllUsers();
      }, []);

      
  const allAllUsers = ()=>{
   setTotal(existingUser.length + existingLecturer.length)
   console.log("Total Users", total)
  }
  useEffect(() => {
    allAllUsers();
  },[existingUser, existingLecturer])
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <section className="bg-[#00294f] text-white p-6 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold mb-1">Welcome back, {existingAdmin?.name}</h1>
        <p className="text-sm text-gray-200">You're in charge! manage users,lecturers, classes, stats, and system activities.</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <AdminCard title="All Users" count={total} />
        <AdminCard title="All Student" count={existingUser.length} link="/admindashboard/managestudent"/>
        <AdminCard title="All Lecturers" count={existingLecturer.length} link="/admindashboard/managelectures" />
      </div>

      <div className="mt-8 bg-white p-4 rounded-xl shadow-md h-[400px]">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Activity Overview</h2>
        <AdminChart lecturerCount={existingLecturer.length} studentCount={existingUser.length} />
      </div>
    </div>
  );
};

export default AdminHome;
