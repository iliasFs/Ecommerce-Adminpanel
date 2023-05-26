import React, { useState } from "react";

interface ModalProps {
  onClose: () => void;
  name: string;
}

const SuccessModal: React.FC<ModalProps> = ({ onClose, name }) => {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white w-[25%] h-[200px] flex flex-col rounded-lg p-6 shadow-xl">
          <h2 className="text-2xl font-bold mb-4">Product has been {name}</h2>
          <a
            href="http://192.168.1.140:3000/"
            className="text-blue-500 underline"
          >
            Visit store
          </a>
          <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={onClose}
          >
            Go back
          </button>
        </div>
      </div>
      <div className="fixed inset-0 bg-gray-900 bg-opacity-90 z-40"></div>
    </>
  );
};

export default SuccessModal;
