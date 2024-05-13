import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '..//contexts/AuthContext'; // Assurez-vous que le chemin est correct

const PrivateRoute = ({ children }) => {
  const { user } = useAuth(); // Utilisez useAuth pour obtenir les données de l'utilisateur

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
