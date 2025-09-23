import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { Html5Qrcode } from "html5-qrcode";
import scanAnimation from "../assets/image/Animation - 1746189382518.gif";
import { markAttendance } from "../../connectBackend";

const ScanFace = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [scanning, setScanning] = useState(false);
  const [code, setCode] = useState("");
  const [isLockedOut, setIsLockedOut] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [attendanceInfo, setAttendanceInfo] = useState(null); // ✅ store confirmation
  const lockoutTimer = useRef(null);
  const qrCodeScanner = useRef(null);

  // load models once
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models";
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
    };
    loadModels();
  }, []);

  // lockout for 2 min (anti-cheat)
  const triggerLockout = () => {
    setIsLockedOut(true);
    lockoutTimer.current = setTimeout(() => {
      setIsLockedOut(false);
    }, 2 * 60 * 1000);
  };

  // ✅ QR scanner (force back camera)
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
          { fps: 10, qrbox: 250 },
          (decodedText) => {
            setCode(decodedText);
            qrCodeScanner.current.stop();
            alert("QR Code scanned. Now scan your face.");
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

  // ✅ Face scan (force front camera)
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

  // detection loop
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

      if (detections.length > 0) {
        clearInterval(interval);

        try {
          const attendanceData = {
            courseCode: code, // from QR
            timestamp: new Date().toISOString(),
          };

          const res = await markAttendance(attendanceData);
          setAttendanceInfo(res); // ✅ show info from backend
          console.log("Attendance marked successfully:", res);

          setIsModalOpen(true);
        } catch (error) {
          console.error("Error marking attendance Frontend:", error);
          alert("Error marking attendance. Try again.");
        }

        setTimeout(() => {
          setIsModalOpen(false);
          setScanning(false);
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

        {/* QR Reader or Face Scanner */}
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

      {/* Success Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm">
            <div className="text-green-500 text-5xl mb-2">✔️</div>
            <h2 className="text-xl font-semibold mb-2">Attendance Marked</h2>
            <p className="text-gray-700">
              {attendanceInfo?.student?.name
                ? `${attendanceInfo.student.name} marked present`
                : "Successfully recorded"}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Course: {code} <br />
              Time: {new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScanFace;
