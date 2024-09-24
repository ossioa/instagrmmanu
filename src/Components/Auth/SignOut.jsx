import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';
import { signOut } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const SignOut = () => {
  const navigate = useNavigate();  // Utilisé pour naviguer vers une autre page après la déconnexion
  const [loading, setLoading] = useState(false);  // État de chargement pour désactiver le bouton pendant la déconnexion
  const [error, setError] = useState('');  // État pour capturer et afficher les erreurs

  // Gestion de la déconnexion
  const handleSignOut = async () => {
    setLoading(true);  // Active l'état de chargement pendant la déconnexion
    setError('');  // Réinitialise l'état de l'erreur au début de l'opération

    try {
      await signOut(auth);  // Firebase signOut
      navigate('/login');  // Redirige l'utilisateur vers la page de connexion après la déconnexion
    } catch (error) {
      console.error('Error signing out: ', error);  // Affiche l'erreur dans la console
      setError('Failed to sign out.');  // Met à jour l'état de l'erreur pour afficher un message à l'utilisateur
      setLoading(false);  // Désactive l'état de chargement si une erreur survient
    }
  };

  return (
    <div>
      {/* Affichage de l'erreur si elle est présente */}
      {error && <p className="text-red-600 font-bold">{error}</p>}
      
      {/* Bouton de déconnexion */}
      <button 
        onClick={handleSignOut} 
        className={`bg-white hover:bg-red-700 text-blue font-bold py-2 px-4 rounded transition duration-300 ease-in-out ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={loading}  // Désactiver le bouton pendant le chargement
      >
        {/* Changement du texte et de l'icône pendant le chargement */}
        {loading ? 'Signing Out...' : <><FontAwesomeIcon icon={faSignOutAlt} /> Sign Out</>}
      </button>
    </div>
  );
};

export default SignOut;
