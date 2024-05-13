import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import EditProfile from './Components/Profile/EditProfile';
import CreatePost from './Components/Post/CreatePost';
import Navbar from './Components/Common/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/post/create" element={<CreatePost />} />
      </Routes>
    </>
  );
}

export default App;
