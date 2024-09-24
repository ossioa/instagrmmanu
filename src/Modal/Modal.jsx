import React, { useEffect } from 'react';

const Modal = ({ isOpen, children, closeModal }) => {
  // Empêche le scroll de la page lorsque le modal est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Si le modal n'est pas ouvert, on ne rend rien
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
      onClick={closeModal}  // Ferme le modal en cliquant en dehors du contenu
    >
      <div
        className="relative bg-white p-5 rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()}  // Empêche la fermeture en cliquant sur le contenu
      >
        {children} {/* Affiche le contenu dynamique du modal */}
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-bold text-lg"
        >
          ❌ {/* Bouton de fermeture */}
        </button>
      </div>
    </div>
  );
};

export default Modal;
