import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex space-x-4 justify-center">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Signup</Link></li>
        <li><Link to="/profile/edit">Edit Profile</Link></li>
        <li><Link to="/post/create">Create Post</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
