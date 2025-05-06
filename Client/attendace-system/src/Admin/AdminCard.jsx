import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Link } from "react-router-dom";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const AdminCard = () => {
  const data = {
    labels: ["Y1", "Y2", "Y3", "Y4", "Y5"],
    datasets: [
      {
        label: "Students",
        data: [20, 30, 25, 15, 10],
        backgroundColor: "#00294f",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { ticks: { display: false }, grid: { display: false } },
      x: { ticks: { color: "#000" }, grid: { display: false } },
    },
  };

  return (
    <div className="mt-5 ">
      <section className="p-5  bg-gray-200 w-80">
        <section className="flex justify-between">
          <div>
            <p className="mb-3 font-bold">Users</p>
            <h1 className="font-semibold text-3xl">100</h1>
          </div>

          <div>
            <Link className="bg-[#00294f] text-[#fff] font-bold flex justify-center items-center px-4 py-2 rounded">
              View
            </Link>
          </div>
        </section>

        <div className="h-28">
          <Bar data={data} options={options} />
        </div>
      </section>
    </div>
  );
};

export default AdminCard;
