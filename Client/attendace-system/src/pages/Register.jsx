import React, { useEffect, useRef, useState } from "react";
import loginImage from "../assets/image/what-is-FR-removebg-preview.png";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../connectBackend";
import * as faceapi from "face-api.js";
import Modal from "../components/Modal";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [faceDescriptor, setFaceDescriptor] = useState(null); // Assuming this is an array of numbers
  const [error, setError] = useState("");
  const [selectedValue, setSelectedValue] = useState(null);
  const navigate = useNavigate();
  const videoRef = useRef(); // for the face detection video stream
  const canvasRef = useRef(null);
  const [open, setOpen] = useState(false); // for the modal dialog
  const [scanningStatus, setScanningStatus] = useState("idle");

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
    loadModels().then(startVideo);
  }, []);

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera error:", err);
    }
  };

  const stopVideo = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const handleOpen = () => {
    const newOpen = !open;
    setOpen(newOpen);
    if (newOpen) {
      startVideo();
    } else {
      stopVideo();
    }
  };

  const handleScanFace = async () => {
    setScanningStatus("scanning");
    const detection = await faceapi
      .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (!detection || !detection.descriptor) {
      setScanningStatus("idle");
      alert("No face detected. Please try again.");
      return;
    }

    const descriptorArray = Array.from(detection.descriptor);
    if(descriptorArray.length !== 128) {
      alert("Face descriptor is not valid. Please try again.");
      return;
    }

    setFaceDescriptor(descriptorArray); // Store the face descriptor
    setScanningStatus("completed");
    console.log("Scanned face descriptor:", descriptorArray);
    alert("Face scanned successfully!");
    stopVideo(); // Stop the video stream after scanning

    // setFaceDescriptor(Array.from(detection.descriptor)); // Convert Float32Array to regular array
    // // const canvas = faceapi.createCanvasFromMedia(videoRef.current);
    // alert("Face scanned successfully!");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const role = selectedValue;

  if(!name || !email || !password || !selectedValue) {
    alert("Please fill all the fields");
    return;
  }

    if (!faceDescriptor || faceDescriptor.length !== 128) {
      alert("Please scan your face before registering.");
      return;
    }
    try {
      const response = await register({
        name,
        email,
        password,
        role:selectedValue,
        faceDescriptor,
      });
      
      alert("Sign up Successful");
      localStorage.setItem("getToken", response.token);
      console.log("Registration successful:", response);
      navigate("/studentdashboard");
    } catch (error) {
      console.error("Error during register:", error);
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

          {/* Face Scan Button */}
          <button
            type="button"
            onClick={handleOpen}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            Open Face Scan
          </button>
          <div className="relative w-fit">
            <Modal
              isOpen={open}
              onClose={handleOpen}
              onConfirm={handleScanFace}
              title="Scan Face"
            >
              <video
                ref={videoRef}
                autoPlay
                muted
                width="500"
                height="240"
                className="rounded-md border"
                // onPlay={handlePlayAndTrackFace}
              />
              {/* <canvas
                ref={canvasRef}
                className="absolute top-0 left-0"
                width="320"
                height="240"
              /> */}

              {scanningStatus === "scanning" && (
                <p className="text-yellow-500 font-semibold mt-2">
                  Scanning...
                </p>
              )}
              {scanningStatus === "completed" && (
                <p className="text-green-500 font-semibold mt-2">
                  Scan Completed ✅
                </p>
              )}
            </Modal>
          </div>

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
