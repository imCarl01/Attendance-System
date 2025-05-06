import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
const AdminSideNavBar = ({ isMenuOpen, setIsMenuOpen }) => {
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
          <h1 className="text-5xl font-semibold text-[#00294f]">SASS Admin</h1>
        </Link>

        <Link to="/admindashboard">
          <ul className="mb-8 text-1xl text-[#00294f] flex gap-2">
            {" "}
            {/* <AdminHome /> */}
            Dashboard
          </ul>
        </Link>
        <Link to="/admindashboard/classes">
          <ul className="mb-8 text-1xl text-[#00294f] flex gap-2">
            {/* <HandleClasses /> */}
            Classes
          </ul>
        </Link>
        <Link to="/admindashboard/managestudent">
          <ul className="mb-8 text-1xl text-[#00294f] flex gap-2">
            {/* <ManageStudent /> */}
            Manage Students
          </ul>
        </Link>
        <Link to="/admindashboard/managelectures">
          <ul className="mb-8 text-1xl text-[#00294f] flex gap-2">
            {/* <ManageLectures /> */}
            Manage Lecturers
          </ul>
        </Link>

        <Link
          to="/admindashboard/adminprofile"
          onClick={() => setIsMenuOpen(false)}
        >
          <ul className="mb-8 text-1xl text-[#00294f] flex gap-2">
            {/* <AdminProfile /> */}
            Profile
          </ul>
        </Link>

        <div>
          <Link className="bg-[#00294f] text-[#fff] font-bold flex justify-center items-center px-4 py-2 rounded">
            Log out
          </Link>
        </div>
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
              <h1 className="text-5xl font-semibold text-[#00294f]">
                SASS Admin
              </h1>
            </Link>
            {/* <Link
            className="block hover:text-blue-600"
            onClick={() => setIsMenuOpen(false)}
          >
            <p className="text-4xl ">X</p>
          </Link> */}
          </div>

          <Link to="/admindashboard" onClick={() => setIsMenuOpen(false)}>
            <ul className="mb-8 text-1xl text-[#00294f] flex gap-2">
              {" "}
              {/* <AdminHome /> */}
              Dashboard
            </ul>
          </Link>
          <Link
            to="/admindashboard/classes"
            onClick={() => setIsMenuOpen(false)}
          >
            <ul className="mb-8 text-1xl text-[#00294f] flex gap-2">
              {/* <HandleClasses /> */}
              Classes
            </ul>
          </Link>
          <Link
            to="/admindashboard/managestudent"
            onClick={() => setIsMenuOpen(false)}
          >
            <ul className="mb-8 text-1xl text-[#00294f] flex gap-2">
              {/* <ManageStudent /> */}
              Manage Students
            </ul>
          </Link>
          <Link
            to="/admindashboard/managelectures"
            onClick={() => setIsMenuOpen(false)}
          >
            <ul className="mb-8 text-1xl text-[#00294f] flex gap-2">
              {/* <ManageLectures /> */}
              Manage Lecturers
            </ul>
          </Link>

          <Link
            to="/admindashboard/adminprofile"
            onClick={() => setIsMenuOpen(false)}
          >
            <ul className="mb-8 text-1xl text-[#00294f] flex gap-2">
              {/* <AdminProfile /> */}
              Profile
            </ul>
          </Link>
        </div>

        <div>
          <Link className="bg-[#00294f] text-[#fff] font-bold flex justify-center items-center px-4 py-2 rounded">
            Log out
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminSideNavBar;
