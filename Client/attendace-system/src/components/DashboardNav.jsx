import React from "react";
import profile from "../assets/image/face-recognition.jpg";
import { Bell, Settings, SunMoon } from "lucide-react";
const DashboardNav = () => {
  return (
    <nav className="">
      <div className="flex justify-between items-center p-5 bg-[#fff] text-[#00294f]">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <p className="text-[#00294f]">
            <SunMoon />
          </p>
          <p className="text-[#00294f]">
            <Bell />
          </p>

          <img
            src={profile}
            alt="Profile"
            className="rounded-full mr-3 w-10 h-10"
          />
          {/* <h1 className='text-xl font-semibold'>John Doe</h1> */}
        </div>
      </div>
    </nav>
  );
};

export default DashboardNav;
