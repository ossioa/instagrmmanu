import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext'; // Assurez-vous que ceci est correct
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import Layout from './Components/Common/Layout';
import EditProfile from './Components/Profile/EditProfile';
import CreatePost from './Components/Post/CreatePost';
import PrivateRoute from './Components/Common/PrivateRoute';

function App() {
  return (
    <Router>
      <AuthProvider> {/* Fournit le contexte d'authentification */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={
            <PrivateRoute>
              <Layout>
                <EditProfile />
                <CreatePost />
                {/* Ajoutez d'autres routes ou composants ici */}
              </Layout>
            </PrivateRoute>
          } />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
