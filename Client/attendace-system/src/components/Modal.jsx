import React from 'react'


const Modal = ({isOpen, onClose, onConfirm, children, title}) => {
    if(!isOpen){
        return null
    }
  return (
    <div className="fixed inset-0 bg-[#021628da] bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white w-[90%] max-w-md rounded-lg shadow-lg p-6 relative">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">{title}</h2>
      <div>{children}</div>
      <div className="mt-6 flex justify-end space-x-2">
        <button
          onClick={onClose}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Scan & Confirm
        </button>
      </div>
    </div>
  </div>
  )
}

export default Modal