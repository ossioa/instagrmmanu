import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import Layout from './Components/Common/Layout';
import EditProfile from './Components/Profile/EditProfile';
import CreatePost from './Components/Post/CreatePost';
//import PrivateRoute from './Components/Common/PrivateRoute';
import Navbar from './Components/Common/Navbar';


function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={
              <Layout>
                <EditProfile />
                <CreatePost />
                <Navbar/>
              </Layout>
          } />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
