import React, { useEffect, useState } from "react";
import { adminProfile } from "../../connectBackend";
import AdminCard from "./AdminCard";
import AdminChart from "./AdminChart";

const AdminHome = () => {
  const [existingAdmin, setExistingAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <section className="bg-[#00294f] text-white p-6 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold mb-1">Welcome back, {existingAdmin?.name}</h1>
        <p className="text-sm text-gray-200">You're in charge. Manage users, stats, and system activities.</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <AdminCard title="Users" count="100" />
        <AdminCard title="Reports" count="25" />
        <AdminCard title="Alerts" count="4" />
      </div>

      <div className="mt-8 bg-white p-4 rounded-xl shadow-md h-[400px]">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Activity Overview</h2>
        <AdminChart />
      </div>
    </div>
  );
};

export default AdminHome;
