import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import scanAnimation from "../assets/image/Animation - 1746189382518.gif";

const ScanFace = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    // Load face-api models
    const loadModels = async () => {
      const MODEL_URL = "/models"; // place models in public/models
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
    };

    loadModels();
  }, []);

  const startVideo = () => {
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
    }, 100);
    return () => clearInterval(interval);
  };

  return (
    <div className="flex flex-col justify-center items-center mt-10 md:mt-0">
      <section className="flex flex-col justify-center items-center gap-4 p-4">
        <h1 className="text-3xl font-bold text-[#00294f]">Mark Attendance</h1>
        <p>Please align face with frame</p>

        {scanning ? (
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

        <button
          className="bg-[#00294f] text-[#fff] font-bold px-4 py-2 rounded w-70"
          onClick={startVideo}
        >
          {scanning ? "Scanning..." : "Scan Face"}
        </button>
      </section>
    </div>
  );
};

export default ScanFace;
