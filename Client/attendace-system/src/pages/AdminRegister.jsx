import React, { useState } from "react";
import loginImage from "../assets/image/what-is-FR-removebg-preview.png";
import { Link, useNavigate } from "react-router-dom";
import {  registerAdmin } from "../../connectBackend";
// import { loginUser } from '../../connectionToBackend';

const AdminRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [faculty, setFaculty] = useState("");
  const [department, setDepartment] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await registerAdmin({
        email,
        password,
        title,
        name,
        faculty,
        department,
      });
      alert("Registered Successful");
      navigate("/admindashboard");
      localStorage.setItem("getToken", response.token);
      // console.log(response.token)
    } catch (error) {
      console.error("Error during login:", error);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="bg-[#00294f] flex flex-col md:flex-row h-screen items-center justify-center px-4">
      {/* Image Section */}
      <div className="hidden md:flex w-1/2 justify-center items-center">
        <img src={loginImage} alt="Login Visual" className="animate-pulse" />
      </div>

      {/* Form Section */}
      <div className="w-full md:w-[400px] bg-white rounded-lg shadow-lg p-4 md:p-5  max-h-[90vh]">
        <h1 className="text-xl md:text-2xl font-bold text-[#00294f] mb-4 text-center">
          Register Admin
        </h1>

        <form className="space-y-3" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Mr, Mrs, Doc, Prof, Engr"
              required
            />
          </div>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Mark Joe"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="faculty"
              className="block text-sm font-medium text-gray-700"
            >
              Faculty
            </label>
            <input
              type="faculty"
              id="faculty"
              value={faculty}
              onChange={(e) => setFaculty(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder=""
              required
            />
          </div>

          <div>
            <label
              htmlFor="department"
              className="block text-sm font-medium text-gray-700"
            >
              Department
            </label>
            <input
              type="department"
              id="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder=""
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-[#00294f] hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            Register
          </button>

          <p className="text-sm text-gray-600 text-center">
            Don’t have an account?{" "}
            <Link to="/loginAdmin" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminRegister;
