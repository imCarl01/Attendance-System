import React from "react";
import profile from "../assets/image/face-recognition.jpg";
import { Bell, Menu, Settings, SunMoon } from "lucide-react";
import { Link } from "react-router-dom";
const AdminDashboardNav = ({toggleMenu}) => {
  return (
    <nav className="">
      
      <div className="flex justify-between items-center p-5 bg-[#fff] text-[#00294f]">
        {/* Mobile menu button */}
        <button onClick={toggleMenu} className="lg:hidden text-[#00294f]">
          <Menu size={28} />
        </button>

        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <p className="text-[#00294f]">
            <SunMoon />
          </p>
          <p className="text-[#00294f]">
            <Bell />
          </p>

<Link to="/profile">

<img
            src={profile}
            alt="Profile"
            className="rounded-full mr-3 w-10 h-10"
          />
</Link>
          {/* <h1 className='text-xl font-semibold'>John Doe</h1> */}
        </div>
      </div>
 
    </nav>
  );
};

export default AdminDashboardNav;
