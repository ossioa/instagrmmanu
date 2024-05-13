import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './config/firebase'; // Assurez-vous que ce chemin est correct
import { AuthContext } from './contexts/AuthContext';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import Layout from './Components/Common/Layout';
import EditProfile from './Components/Profile/EditProfile';
import CreatePost from './Components/Post/CreatePost';
import PrivateRoute from './Components/Common/ProtectedRoute'; // Assurez-vous que ce composant est correctement défini

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe(); // Nettoyer l'abonnement à l'authentification
  }, []);

  return (
    <Router>
      <AuthContext.Provider value={{ user }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={
            <ProtectedRoute user={user}>
              <Layout user={user}>
                <EditProfile />
                <CreatePost />
                {/* Ajoutez d'autres routes ou composants ici */}
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
