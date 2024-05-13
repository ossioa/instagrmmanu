import React from 'react';

const Modal = ({ isOpen, children, closeModal }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p- rounded-lg">
        {children}
        <button onClick={closeModal} className="absolute top-2 right-2 text-lg">✖</button>
      </div>
    </div>
  );
};

export default Modal;
