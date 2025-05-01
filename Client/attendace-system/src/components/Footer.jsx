import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#00294f] text-white py-8 px-6 md:px-20">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">

        {/* Left Section */}
        <div className="text-center md:text-left">
          <p className="font-semibold">© {new Date().getFullYear()} SASS</p>
          {/* <p className="text-sm text-gray-400">Final Year Project – [Your University Name]</p> */}
        </div>

        {/* Right Section */}
        <div className="flex space-x-6">
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
            <FaGithub size={20} className="hover:text-gray-300" />
          </a>
          <a href="mailto:your@email.com">
            <FaEnvelope size={20} className="hover:text-gray-300" />
          </a>
          <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={20} className="hover:text-gray-300" />
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
