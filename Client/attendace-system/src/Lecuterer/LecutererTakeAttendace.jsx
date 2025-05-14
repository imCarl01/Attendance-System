import React from 'react';
import { useLocation } from 'react-router-dom';
import QrCodeGenerator from '../components/QrCodeGenerator';

const LecturerTakeAttendance = () => {
  const location = useLocation();
  const { course } = location.state || {};

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-6 md:p-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Set Attendance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Course Details Section */}
          <div className="space-y-3 text-sm text-gray-700">
            <p>
              <span className="font-semibold text-gray-900">Course Title:</span> {course?.title}
            </p>
            <p>
              <span className="font-semibold text-gray-900">Course Code:</span> {course?.code}
            </p>
            <p>
              <span className="font-semibold text-gray-900">Location:</span> {course?.location}
            </p>
            <p>
              <span className="font-semibold text-gray-900">Time:</span> {course?.time?.day} | {course?.time?.start} - {course?.time?.endtime}
            </p>
            <p>
              <span className="font-semibold text-gray-900">Department:</span> {course?.department}
            </p>
          </div>

          {/* QR Code Generator Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">QR Code for Attendance</h3>
            <QrCodeGenerator />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LecturerTakeAttendance;
