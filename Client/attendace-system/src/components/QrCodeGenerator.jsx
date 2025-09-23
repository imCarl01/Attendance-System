import React, { useState, useEffect } from "react";
import { generateQRCode } from "../../connectBackend";
import { QRCodeCanvas } from "qrcode.react";

const QrCodeGenerator = ({ course, lecturerId }) => {
  const [qrCode, setQrCode] = useState("");
  const [loading, setLoading] = useState(false);

  console.log("QrCodeGenerator props:", course, lecturerId);

  const handleGenerateQR = async () => {
    try {
      setLoading(true);
      setQrCode("");

      const payload = {
  courseId: course?._id,       // just the course ID
  lecturerId: lecturerId,      // just the lecturer ID
};


      console.log("Sending payload:", payload);

      const response = await generateQRCode(payload);
      setQrCode(response.code);
    } catch (error) {
      console.error("Error generating QR:", error);
      alert("Failed to generate QR Code");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let interval;
    if (qrCode) {
      interval = setInterval(() => {
        handleGenerateQR();
      }, 30000);
    }
    return () => clearInterval(interval);
  }, [qrCode]);

  return (
    <div className="p-4 flex flex-col items-center gap-4">
      <h2 className="text-xl font-bold">QR Code Generator</h2>

      <button
        onClick={handleGenerateQR}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Generating..." : "Generate QR"}
      </button>

      {qrCode && (
        <div className="mt-4">
          <QRCodeCanvas value={qrCode} size={256} />
          <p className="text-sm text-gray-500 mt-2">Valid for 30 seconds</p>
        </div>
      )}
    </div>
  );
};

export default QrCodeGenerator;
