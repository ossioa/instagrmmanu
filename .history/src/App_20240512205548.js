import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
//import Layout from './Components/Common/Layout';
import PrivateRoute from './Components/Common/PrivateRoute';
import Home from './Home';

function App() {
  return (
    <Router>
      <AuthProvider>
      <PostsProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={
              <PrivateRoute>
                <Home/>
              </PrivateRoute>
            } />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
