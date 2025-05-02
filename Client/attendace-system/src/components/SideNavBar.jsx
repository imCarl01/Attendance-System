import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Bell,
  ChartBarBig,
  History,
  LayoutDashboard,
  PersonStanding,
  PersonStandingIcon,
  Scan,
  School,
  Settings,
  UserPen,
} from "lucide-react";
import logoSASS from "../assets/image/SASS_logo-removebg-preview.png";
const SideNavBar = ({ isMenuOpen, setIsMenuOpen }) => {
  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div>
      {/* desktop side nav */}
      <div className="hidden p-10 bg-[#ffffff] w-60 h-screen md:block lg:block">
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

      {/* mobile side nav */}
      <div
        className={`lg:hidden fixed top-0 left-0 p-10 h-screen bg-white z-40 transition-transform transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } w-70 shadow-md`}
      >
        <div className="flex flex-col items-left justify-between ">
          <div>
          <Link className="flex items-center text-left space-y-2 mb-10">
          {/* <img src={logoSASS} alt="SASS Logo" className="w-16" /> */}
          <h1 className="text-5xl font-semibold text-[#00294f]">SASS</h1>
        </Link>
          {/* <Link
            className="block hover:text-blue-600"
            onClick={() => setIsMenuOpen(false)}
          >
            <p className="text-4xl ">X</p>
          </Link> */}
        </div>

        <Link to="/studentdashboard"  onClick={() => setIsMenuOpen(false)}>
          <ul className="mb-8 text-1xl text-[#00294f] flex gap-2">
            {" "}
            <LayoutDashboard />
            Dashboard
          </ul>
        </Link>
        <Link to="/studentdashboard/scan"  onClick={() => setIsMenuOpen(false)}>
          <ul className="mb-8 text-1xl text-[#00294f] flex gap-2">
            <Scan />
            Scan Face
          </ul>
        </Link>
        <Link to="/studentdashboard/classes"  onClick={() => setIsMenuOpen(false)}>
          <ul className="mb-8 text-1xl text-[#00294f] flex gap-2">
            <School />
            Classes
          </ul>
        </Link>
        <Link to="/studentdashboard/status"  onClick={() => setIsMenuOpen(false)}>
          <ul className="mb-8 text-1xl text-[#00294f] flex gap-2">
            <ChartBarBig />
            Status
          </ul>
        </Link>
        <Link to="/studentdashboard/history"  onClick={() => setIsMenuOpen(false)}>
          {" "}
          <ul className="mb-8 text-1xl text-[#00294f] flex gap-2">
            <History />
            History
          </ul>
        </Link>
        <Link to="/studentdashboard/notification"  onClick={() => setIsMenuOpen(false)}>
          <ul className="mb-8 text-1xl text-[#00294f] flex gap-2">
            <Bell />
            Nofication
          </ul>
        </Link>
        <Link to="/studentdashboard/settings"  onClick={() => setIsMenuOpen(false)}>
          <ul className="mb-8 text-1xl text-[#00294f] flex gap-2">
            <Settings />
            Settings
          </ul>
        </Link>

        <Link to="/studentdashboard/profile"  onClick={() => setIsMenuOpen(false)}>
          <ul className="mb-8 text-1xl text-[#00294f] flex gap-2">
          <UserPen />
            Profile
          </ul>
        </Link>
          </div>
     
<div>
<Link  className="bg-[#00294f] text-[#fff] font-bold flex justify-center items-center px-4 py-2 rounded">Log out</Link>
</div>
                    
      </div>
    </div>
  );
};

export default SideNavBar;
