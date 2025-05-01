import React from "react";
import { Link } from "react-router-dom";
import {
  Bell,
  ChartBarBig,
  History,
  LayoutDashboard,
  Scan,
  School,
  Settings,
} from "lucide-react";
import logoSASS from "../assets/image/SASS_logo-removebg-preview.png";
const SideNavBar = () => {
  return (
    <div className="p-10 bg-[#ffffff] w-60 h-screen">
      <Link className="flex items-center text-left space-y-2 mb-10">
        {/* <img src={logoSASS} alt="SASS Logo" className="w-16" /> */}
        <h1 className="text-5xl font-semibold text-[#00294f]">SASS</h1>
      </Link>

      <Link to="/studentdashboard">
        <ul className="mb-8 text-1xl text-[#00294f] flex gap-2">
          {" "}
          <LayoutDashboard />
          Dashboard
        </ul>
      </Link>
      <Link to="/studentdashboard/scan">
        <ul className="mb-8 text-1xl text-[#00294f] flex gap-2">
          <Scan />
          Scan Face
        </ul>
      </Link>
      <Link to="/studentdashboard/classes">
        <ul className="mb-8 text-1xl text-[#00294f] flex gap-2">
          <School />
          Classes
        </ul>
      </Link>
      <Link to="/studentdashboard/status">
        <ul className="mb-8 text-1xl text-[#00294f] flex gap-2">
          <ChartBarBig />
          Status
        </ul>
      </Link>
      <Link to="/studentdashboard/history">
        {" "}
        <ul className="mb-8 text-1xl text-[#00294f] flex gap-2">
          <History />
          History
        </ul>
      </Link>
      <Link to="/studentdashboard/notification">
        <ul className="mb-8 text-1xl text-[#00294f] flex gap-2">
          <Bell />
          Nofication
        </ul>
      </Link>
      <Link to="/studentdashboard/settings">
        <ul className="mb-8 text-1xl text-[#00294f] flex gap-2">
          <Settings />
          Settings
        </ul>
      </Link>
    </div>
  );
};

export default SideNavBar;
