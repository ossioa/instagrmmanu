import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 text-white p-4 shadow-md">
      <ul className="flex space-x-4 justify-center">
        <li><Link className="hover:text-blue-300 transition duration-200" to="/">Home</Link></li>
        <li><Link className="hover:text-blue-300 transition duration-200" to="/login">Login</Link></li>
        <li><Link className="hover:text-blue-300 transition duration-200" to="/signup">Sign up</Link></li>
        <li><Link className="hover:text-blue-300 transition duration-200" to="/sign">Sign Out</Link></li>
        <li><Link className="hover:text-blue-300 transition duration-200" to="/profile/edit">Edit Profile</Link></li>
        <li><Link className="hover:text-blue-300 transition duration-200" to="/post/create">Create Post</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
