import React, { useState } from 'react';

const AttendanceTable = () => {
  const allData = [
    { className: "CSC 401", lecturer: "Dr. Okafor", time: "10:00 AM", attended: 32, notAttended: 8 },
    { className: "MTH 211", lecturer: "Prof. Adeyemi", time: "12:00 PM", attended: 28, notAttended: 12 },
    { className: "PHY 110", lecturer: "Dr. Musa", time: "2:00 PM", attended: 45, notAttended: 5 },
    { className: "ENG 102", lecturer: "Mrs. Johnson", time: "3:00 PM", attended: 38, notAttended: 2 },
    { className: "BIO 150", lecturer: "Prof. Obi", time: "4:00 PM", attended: 40, notAttended: 10 },
    { className: "CHM 202", lecturer: "Dr. Balogun", time: "5:00 PM", attended: 29, notAttended: 11 },
    // Add more dummy data as needed
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = allData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(allData.length / itemsPerPage);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-2 mt-2">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow rounded-lg">
          <thead className="bg-[#00294f] text-white">
            <tr>
              <th className="px-6 py-3 text-left">Class</th>
              <th className="px-6 py-3 text-left">Lecturer</th>
              <th className="px-6 py-3 text-left">Time</th>
              <th className="px-6 py-3 text-left">Attended</th>
              <th className="px-6 py-3 text-left">Not Attended</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((entry, index) => (
              <tr key={index} className="border-t">
                <td className="px-6 py-4">{entry.className}</td>
                <td className="px-6 py-4">{entry.lecturer}</td>
                <td className="px-6 py-4">{entry.time}</td>
                <td className="px-6 py-4 text-green-600 font-semibold">{entry.attended}</td>
                <td className="px-6 py-4 text-red-600 font-semibold">{entry.notAttended}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`px-4 py-2 rounded ${
              currentPage === page
                ? "bg-[#00294f] text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {page}
          </button>
        ))}
      </div>
      
    </div>
  );
};

export default AttendanceTable;
