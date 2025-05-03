import React, { useEffect, useRef, useState } from "react";
import loginImage from "../assets/image/what-is-FR-removebg-preview.png";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../connectBackend";
// import { loginUser } from '../../connectionToBackend';
import * as faceapi from "face-api.js";
const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [faceDescriptor, setFaceDescriptor] = useState(null); // Assuming this is an array of numbers
  const [error, setError] = useState("");
  const [selectedValue, setSelectedValue] = useState(null);
  const navigate = useNavigate();
  const videoRef = useRef();

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models";
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
    };

    const startVideo = () => {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
        })
        .catch((err) => console.error("Camera error:", err));
    };

    loadModels().then(startVideo);
  }, []);

  const handleScanFace = async () => {
    const detection = await faceapi
      .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (!detection) {
      alert("No face detected. Please try again.");
      return;
    }

    setFaceDescriptor(Array.from(detection.descriptor)); // Convert Float32Array to regular array
    // const canvas = faceapi.createCanvasFromMedia(videoRef.current);
    alert("Face scanned successfully!");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const role = selectedValue;
    
    if (!faceDescriptor) {
      alert("Please scan your face before registering.");
      return;
    }
    try {


      const response = await register({
        name,
        email,
        password,
        role,
        faceDescriptor,
      });
      alert("Sign up Successful");
      navigate("/studentdashboard");
      localStorage.setItem("getToken", response.token);
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
      <div className="w-full md:w-1/2 max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-[#00294f] mb-6 text-center">
          Create an Account
        </h1>

        <form className="space-y-5" action="#" onSubmit={handleRegister}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="John Doe"
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

          <div className="flex gap-4">
            <div>
              <input
                type="radio"
                id="user"
                name="options"
                value="user"
                checked={selectedValue === "user"}
                onChange={handleChange}
              />
              <label
                htmlFor="student"
                className="block text-sm font-medium text-gray-700"
              >
                Student
              </label>
            </div>

            <div>
              <input
                type="radio"
                id="lecturer"
                name="options"
                value="lecturer"
                checked={selectedValue === "lecturer"}
                onChange={handleChange}
              />
              <label
                htmlFor="lecturer"
                className="block text-sm font-medium text-gray-700"
              >
                Lecturer
              </label>
            </div>
          </div>

          <video
            ref={videoRef}
            autoPlay
            muted
            width="320"
            height="240"
            className="rounded-md border"
          />
          <button
            type="button"
            onClick={handleScanFace}
            className="bg-green-600 text-white mt-2 px-4 py-1 rounded"
          >
            Scan Face
          </button>
          <button
            type="submit"
            className="w-full bg-[#00294f] hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            Register
          </button>

          <p className="text-sm text-gray-600 text-center">
            Don’t have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
