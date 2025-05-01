import React, { useRef } from "react";
import { FaPlayCircle, FaUserCheck, FaClipboardList } from "react-icons/fa";
import useIsVisble from "../Hook/useIsVisble";

const steps = [
  {
    title: "Lecturer Starts Session",
    icon: <FaPlayCircle size={30} className="text-white" />,
    description:
      "The lecturer clicks a single button to start the attendance window — no roll call or register needed.",
  },
  {
    title: "Students Scan Face",
    icon: <FaUserCheck size={30} className="text-white" />,
    description:
      "Each student scans their face using a webcam. The system identifies and verifies them instantly.",
  },
  {
    title: "Attendance is Logged",
    icon: <FaClipboardList size={30} className="text-white" />,
    description:
      "All verified faces are automatically recorded and linked to the session — securely and accurately.",
  },
];

const HowItWorks = () => {
    const ref1 = useRef()
    const isVisible1 = useIsVisble(ref1)
  return (
    <div className="bg-[#00294f] text-white py-20 px-6 md:px-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        How It Works
      </h2>

      <div ref={ref1} className={`grid gap-10 md:grid-cols-3 transition-opacity ease-in-out duration-700 ${isVisible1 ? "opacity-100":"opacity-0"}`}>
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-[#061c33] p-6 rounded-2xl shadow-lg flex flex-col items-center text-center hover:shadow-xl transition"
          >
            <div className="bg-[#1f355e] p-4 rounded-full mb-4">{step.icon}</div>
            <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
            <p className="text-sm text-gray-300">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
