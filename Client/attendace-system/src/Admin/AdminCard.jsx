import React from "react";
import { Link } from "react-router-dom";

const AdminCard = ({ title, count }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 flex flex-col justify-between hover:shadow-lg transition">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h1 className="text-3xl font-bold text-[#00294f] mt-1">{count}</h1>
      </div>
      <Link
        to="#"
        className="mt-4 inline-block text-sm font-semibold text-white bg-[#00294f] hover:bg-[#01427a] px-4 py-2 rounded-lg transition"
      >
        View Details
      </Link>
    </div>
  );
};

export default AdminCard;
