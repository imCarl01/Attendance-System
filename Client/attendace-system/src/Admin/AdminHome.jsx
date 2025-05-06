import React, { useEffect, useState } from "react";
import { adminProfile } from "../../connectBackend";
import AdminCard from "./AdminCard";

const AdminHome = () => {
  const [existingAdmin, setExistingAdmin] = useState(null);
  const getAdminProfile = async () => {
    try {
      const response = await adminProfile();
      console.log("Feteched Prodile:", response);
      if (response) {
        setExistingAdmin(response.existingAdmin);
        localStorage.setItem(
          "existingAdmin",
          JSON.stringify(response.existingAdmin)
        );
      }
    } catch (error) {
      console.error("Error fetching AdminProfile:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAdminProfile();
  });
  return (
    <div>
      <section className="bg-[#00294f] text-[#fff] px-4 py-2 rounded p-4">
        <div className="p-5">
          <h1 className="text-4xl font-bold flex items-center gap-3">
            {" "}
            Admin:<p> {existingAdmin?.name}</p>
          </h1>
          <p>Your in charge! handle everything</p>
        </div>
      </section>

      <section className="flex flex-col md:flex-row lg:flex-row justify-between items-center">
        <AdminCard/>
        <AdminCard/>
        <AdminCard/>
      </section>

      {/* <section className="bg-gray-200 mt-5 text-[#00294f] px-4 py-2 rounded p-4">
        <div className="p-5">
          <h1 className="text-4xl font-bold flex items-center gap-3">
            {" "}
            Admin:<p> {existingAdmin?.name}</p>
          </h1>
            <div className='h-100 items-baseline'>
                          <Bar data={data} options={options}/>
                      </div>
        </div>
      </section> */}
    </div>
  );
};

export default AdminHome;
