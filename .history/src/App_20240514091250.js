import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { PostsProvider } from './contexts/PostsContext';
import Login from './Components/Auth/Login';
import PrivateRoute from './Components/Common/PrivateRoute';
import Home from './Home';

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <AuthProvider>
        <PostsProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            {user ? (
              <Route path="/" element={<Home />} />
            ) : (
              <Navigate to="/login" />
            )}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </PostsProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
