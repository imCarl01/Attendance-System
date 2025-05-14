import React, { useEffect, useState } from "react";
import { profileLecturer } from "../../connectBackend";
import AdminCard from "../Admin/AdminCard";
import AdminChart from "../Admin/AdminChart";
import LecturerClasses from "./LecutererClasses";
// import { adminProfile } from "../../connectBackend";
// import AdminCard from "./AdminCard";
// import AdminChart from "./AdminChart";

const LecutererHome = () => {
  const [existingLecturer, setExistingLecturer] = useState(null);
  const [loading, setLoading] = useState(true);

  const getLecturerProfile = async () => {
    try {
      const response = await profileLecturer();
      if (response) {
        setExistingLecturer(response.existingLecturer);
        localStorage.setItem("existingLecturer", JSON.stringify(response.existingLecturer));
        console.log(response.existingLecturer)
      }
    } catch (error) {
      console.error("Error fetching AdminProfile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLecturerProfile();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <section className="bg-[#00294f] text-white p-6 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold mb-1">Welcome,{existingLecturer?.title} {existingLecturer?.name || "Test Lecturer"}</h1>
        <p className="text-sm text-gray-200">Manage your classes, view schedules, and monitor student attendance all from your dashboard.</p>
        {<LecturerClasses lecturerId={existingLecturer?._id} />}
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <AdminCard title="Total Classes" count="10" />
        <AdminCard title="Total Students" count="100" />
        <AdminCard title="Today's Attendance" count="4" />
      </div>

      <div className="mt-8 bg-white p-4 rounded-xl shadow-md h-[400px] hidden md:block lg:block">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Activity Overview</h2>
        <AdminChart />
      </div>
    </div>
  );
};

export default LecutererHome;
