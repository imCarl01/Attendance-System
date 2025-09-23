import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { Html5Qrcode } from "html5-qrcode";
import scanAnimation from "../assets/image/Animation - 1746189382518.gif";
import { markAttendance } from "../../connectBackend";

const ScanFace = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [scanning, setScanning] = useState(false);
  const [code, setCode] = useState(""); // QR code value (class/session code)
  const [isLockedOut, setIsLockedOut] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const lockoutTimer = useRef(null);
  const qrCodeScanner = useRef(null);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models";
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
    };
    loadModels();
  }, []);

  const triggerLockout = () => {
    setIsLockedOut(true);
    lockoutTimer.current = setTimeout(() => {
      setIsLockedOut(false);
    }, 2 * 60 * 1000); // 2 minutes lockout
  };

  // ✅ Start QR code scan with back camera
  const startQrScanner = async () => {
    if (isLockedOut) return;

    try {
      const devices = await Html5Qrcode.getCameras();
      if (devices && devices.length) {
        const backCamera = devices.find((d) =>
          d.label.toLowerCase().includes("back")
        );
        const cameraId = backCamera ? backCamera.id : devices[0].id;

        qrCodeScanner.current = new Html5Qrcode("qr-reader");

        qrCodeScanner.current.start(
          cameraId,
          {
            fps: 10,
            qrbox: 250,
          },
          (decodedText) => {
            setCode(decodedText);
            qrCodeScanner.current.stop();
            alert("✅ QR Code scanned. Now scan your face.");
          },
          (errorMessage) => {
            console.warn(errorMessage);
          }
        );
      }
    } catch (err) {
      console.error("QR Scanner error:", err);
    }
  };

  // ✅ Use front camera for face scan
  const startVideo = () => {
    if (!code || isLockedOut) return;
    setScanning(true);

    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "user" } })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error("Front camera error:", err));
  };

  const handlePlay = () => {
    const interval = setInterval(async () => {
      if (!videoRef.current) return;
      const detections = await faceapi.detectAllFaces(
        videoRef.current,
        new faceapi.TinyFaceDetectorOptions()
      );
      const canvas = canvasRef.current;
      const displaySize = {
        width: videoRef.current.videoWidth,
        height: videoRef.current.videoHeight,
      };
      faceapi.matchDimensions(canvas, displaySize);
      const resized = faceapi.resizeResults(detections, displaySize);
      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
      faceapi.draw.drawDetections(canvas, resized);

      // ✅ If face detected → mark attendance
      if (detections.length > 0) {
        clearInterval(interval);
        setIsModalOpen(true);

        try {
          const attendanceData = {
            courseCode: code, // QR code value
            timestamp: new Date(),
            // Optional: Add studentId / name if available from auth
            // studentId: user.id,
          };
          await markAttendance(attendanceData);
          console.log("✅ Attendance marked successfully:", attendanceData);
        } catch (error) {
          console.error("❌ Error marking attendance:", error);
        }

        setTimeout(() => {
          setIsModalOpen(false);
        }, 3000);
      }
    }, 500);

    return () => clearInterval(interval);
  };

  return (
    <div className="flex flex-col justify-center items-center mt-10 md:mt-0">
      <section className="flex flex-col justify-center items-center gap-4 p-4">
        <h1 className="text-3xl font-bold text-[#00294f]">Mark Attendance</h1>
        <p>Please scan QR code, then align face with frame.</p>

        {/* QR Reader / Video / Animation */}
        {!code ? (
          <div id="qr-reader" className="w-[300px]" />
        ) : scanning ? (
          <div className="relative">
            <video
              ref={videoRef}
              autoPlay
              muted
              onPlay={handlePlay}
              className="rounded-lg w-[300px] h-auto"
            />
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 w-[300px] h-auto"
            />
          </div>
        ) : (
          <img
            src={scanAnimation}
            alt="Scan Animation"
            className="w-70 h-70 object-cover"
          />
        )}

        {/* Buttons */}
        {!code ? (
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={startQrScanner}
          >
            Start QR Scan
          </button>
        ) : (
          <button
            className="bg-[#00294f] text-[#fff] font-bold px-4 py-2 rounded w-70"
            onClick={startVideo}
          >
            {scanning ? "Scanning..." : "Scan Face"}
          </button>
        )}
      </section>

      {/* Modal ✅ Attendance Success */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm">
            <div className="text-green-500 text-5xl mb-2">✔️</div>
            <h2 className="text-xl font-semibold mb-2">Attendance Marked</h2>
            <p className="text-gray-700">Successfully recorded</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScanFace;
