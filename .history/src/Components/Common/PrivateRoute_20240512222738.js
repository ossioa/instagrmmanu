// Dans PrivateRoute (exemple simplifié pour vérification)
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    console.log("Redirecting to login because no user is logged in");
    return <Navigate to="/login" />;
  }

  return children;
};
