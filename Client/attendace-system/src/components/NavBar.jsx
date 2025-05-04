import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const NavBar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    <nav className="bg-white shadow-md fixed top-0 left-0 z-50 w-full pl-5">
        
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Hamburger Menu Icon */}
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-blue-600 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold  hidden md:block"
        >
          SASS
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex space-x-4 text-sm text-gray-700">
          {user ? (
            <>
              <Link
                to="/profile"
                className="hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                <PersonIcon className="text-blue-500" />{" "}
                {user?.name || "John Doe"}
              </Link>
              <Link to="/become-a-seller" className="hover:text-blue-600">
                Become a Seller
              </Link>
              <button onClick={logout} className="hover:text-red-600">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-600 font-semibold">
                Login
              </Link>
              <span>|</span>
              <Link to="/register" className="hover:text-blue-600 font-semibold">
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Sidebar Menu */}
      <div
        // ref={menuRef}
        className={`lg:hidden fixed top-0 left-0 h-screen bg-white z-40 transition-transform transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } w-70 shadow-md`}
      >
        <div className="p-6 space-y-4 text-gray-700">
          <div className="flex items-center justify-between mb-4">
            <Link to="/" className="text-2xl font-bold">
              SASS
            </Link>
            <Link
              className="block hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
             <p className="text-4xl ">X</p>
            </Link>
          </div>


          <div className="flex flex-col space-y-2 mt-4">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="hover:text-blue-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="hover:text-blue-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/profile"
                  className="hover:text-blue-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <PersonIcon className="text-blue-500" />{" "}
                  {user?.name || "John Doe"}
                </Link>
                <Link
                  to="/signup"
                  className="hover:text-blue-600"
                //   onClick={logout}
                >
                  Logout
                </Link>
              </>
            )}
          </div>

          <div></div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
