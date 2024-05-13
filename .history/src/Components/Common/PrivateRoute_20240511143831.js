import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth(); // Assurez-vous que useAuth retourne bien les données de l'utilisateur

  // Si l'utilisateur n'est pas connecté, redirigez-le vers la page de connexion
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Si l'utilisateur est connecté, affichez les composants enfants
  return children;
};

export default PrivateRoute;
