import { useState, useRef } from "react";
import * as htmlToImage from "html-to-image";
import QRCode from "react-qr-code"; // Make sure this is installed: npm i react-qr-code

const QrCodeGenerator = () => {
  const [url, setUrl] = useState("");
  const [qrIsVisible, setQrIsVisible] = useState(false);
  const qrCodeRef = useRef(null);

  const handleQrCodeGenerator = () => {
    if (!url) return;
    setQrIsVisible(true);
  };

  const downloadQRCode = () => {
    htmlToImage
      .toPng(qrCodeRef.current)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "qr-code.png";
        link.click();
      })
      .catch((error) => {
        console.error("Error generating QR code:", error);
      });
  };

  return (
    <div className="flex flex-col bg-white">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Attendace Code Generator</h1>

      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-6 space-y-6" ref={qrCodeRef}>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Enter a URL"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button
            onClick={handleQrCodeGenerator}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition duration-200"
          >
            Generate Code
          </button>
        </div>

        {qrIsVisible && (
          <div className="flex flex-col items-center gap-4 mt-6">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <QRCode value={url} size={256} />
            </div>
            <button
              onClick={downloadQRCode}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition duration-200"
            >
              Download Code
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QrCodeGenerator;
