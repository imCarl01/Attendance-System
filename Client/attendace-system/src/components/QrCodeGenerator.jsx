import React, { useState, useEffect, useCallback } from "react";
import { generateQRCode } from "../../connectBackend"; // Assuming this connects to your server
import { QRCodeCanvas } from "qrcode.react";

const QrCodeGenerator = ({ course, lecturerId }) => {
 const [qrCode, setQrCode] = useState("");
const [loading, setLoading] = useState(false);

 // 1. Use useCallback to stabilize the generation and refresh function
 const handleGenerateQR = useCallback(async () => {
  try {
   setLoading(true);
   setQrCode("");

   const payload = {
    courseId: course?._id,
    lecturerId: lecturerId,
   };

   console.log("Sending payload for QR generation:", payload);

   const response = await generateQRCode(payload);

   console.log("QR code response from backend:", response);

   // 2. CRUCIAL FIX: Ensure 'response' contains 'sessionId' and save it
   // This ID is what the LecturerViewAttendance component uses to fetch records.
   if (response.sessionId) {
    localStorage.setItem("currentSessionId", response.sessionId);
    console.log("Saved new sessionId to localStorage:", response.sessionId);
   } else {
    console.error("Backend did not return a sessionId!");
   }

   // 3. Set the QR code content (which the student scans)
   setQrCode(response.code);
  } catch (error) {
   console.error("Error generating QR:", error);
   alert("Failed to generate QR Code");
  } finally {
   setLoading(false);
  }
 }, [course?._id, lecturerId]); // Dependencies for useCallback: only refresh if course/lecturer changes

 // 4. Auto-refresh QR every 30s using the stable function
 useEffect(() => {
  let interval;
  
  if (qrCode) { // Only start the timer after the first successful code generation
   interval = setInterval(() => {
    console.log("Refreshing QR code...");
    handleGenerateQR(); // Uses the stable function from useCallback
   }, 30000);
  }

  return () => {
        // Clear the interval when the component unmounts or dependencies change
        clearInterval(interval);
    };
 }, [qrCode, handleGenerateQR]); // Dependencies for useEffect

 return (
  <div className="p-4 flex flex-col items-center gap-4">
   <h2 className="text-xl font-bold">QR Code Generator</h2>

   <button
    onClick={handleGenerateQR}
    disabled={loading}
    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
   >
    {loading ? "Generating..." : "Generate/Refresh QR"}
   </button>

   {qrCode && (
    <div className="mt-4 flex flex-col items-center">
     <QRCodeCanvas value={qrCode} size={256} />
     <p className="text-sm text-gray-500 mt-2">Valid for 30 seconds</p>
     {/* Display the current Session ID (for debugging) */}
     {/* <p className="text-xs text-red-400 mt-1">Session ID: {localStorage.getItem("currentSessionId")}</p> */}
    </div>
   )}
  </div>
 );
};

export default QrCodeGenerator;