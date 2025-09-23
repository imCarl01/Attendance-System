import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { Html5QrcodeScanner } from "html5-qrcode";
import scanAnimation from "../assets/image/Animation - 1746189382518.gif";
import { markAttendance } from "../../connectBackend";

const ScanFace = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [scanning, setScanning] = useState(false);
  const [code, setCode] = useState("");
  const [isLockedOut, setIsLockedOut] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [matchedUser, setMatchedUser] = useState(null);
  const lockoutTimer = useRef(null);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models";
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
    };
    loadModels();

    const handleVisibilityChange = () => {
      if (document.hidden) triggerLockout();
    };

    const handlePrintScreen = (e) => {
      e.preventDefault();
      triggerLockout();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("keyup", (e) => {
      if (e.key === "PrintScreen") handlePrintScreen(e);
    });

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const disableContextMenu = (e) => e.preventDefault();
    document.addEventListener("contextmenu", disableContextMenu);
    return () => {
      document.removeEventListener("contextmenu", disableContextMenu);
    };
  }, []);

  const triggerLockout = () => {
    setIsLockedOut(true);
    lockoutTimer.current = setTimeout(() => {
      setIsLockedOut(false);
    }, 2 * 60 * 1000); // 2 minutes for testing
  };

  const startQrScanner = () => {
    if (isLockedOut) return;

    const qrScanner = new Html5QrcodeScanner("qr-reader", {
      fps: 10,
      qrbox: 250,
    });

    qrScanner.render(
      (decodedText) => {
        setCode(decodedText);
        qrScanner.clear();
        alert("QR Code scanned. Now scan your face.");
      },
      (error) => {
        console.warn(error);
      }
    );
  };

  const startVideo = () => {
    if (!code || isLockedOut) return;
    setScanning(true);
    navigator.mediaDevices.getUserMedia({ video: {} }).then((stream) => {
      videoRef.current.srcObject = stream;
    });
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

      if (detections.length > 0) {
        clearInterval(interval);
        setIsModalOpen(true);
        try {
          const attendanceData = {
            courseCode: code,
          }
          await markAttendance(attendanceData);
          console.log("Attendance marked successfully", attendanceData);
        } catch (error) {
          console.error("Error marking attendance Frontend:", error);
        }
        setTimeout(() => {
          setIsModalOpen(false);
          // optionally reset states like `code` or `scanning` here
        }, 3000); // Auto-close after 3 seconds
      }
    }, 500);
    return () => clearInterval(interval);
  };

  return (
    <div className="flex flex-col justify-center items-center mt-10 md:mt-0">
      <section className="flex flex-col justify-center items-center gap-4 p-4">
        <h1 className="text-3xl font-bold text-[#00294f]">Mark Attendance</h1>
        <p>Please scan QR code, then align face with frame.</p>

        {isLockedOut ? (
          <div className="text-red-600 font-bold">
            You have been locked out for 2 minutes due to suspicious activity.
          </div>
        ) : (
          <>
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
            <input
              type="text"
              value={code}
              readOnly
              hidden
              onCopy={(e) => {
                e.preventDefault();
                triggerLockout();
              }}
            />
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
          </>
        )}
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm">
            <div className="text-green-500 text-5xl mb-2">✔️</div>
            <h2 className="text-xl font-semibold mb-2">Attendance Marked</h2>
            <p className="text-gray-700">Successfully</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScanFace;
