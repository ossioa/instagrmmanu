import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../AuthContextcontexts/AuthContext';

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);  // State to handle mobile menu toggle

  return (
    <nav className="bg-blue-500 text-white p-4 shadow-md">
      <div className="flex justify-between items-center">
        <div className="text-lg font-bold">Instagram Clone</div>
        <div className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          <button>{isOpen ? "Close" : "Menu"}</button>
        </div>
      </div>
      <ul className={`md:flex md:space-x-4 md:justify-center ${isOpen ? "block" : "hidden"}`}>
        <li><Link className="hover:text-blue-300 transition duration-200" to="/">Home</Link></li>
        {currentUser ? (
          <>
            <li><Link className="hover:text-blue-300 transition duration-200" to="/signout">Sign Out</Link></li>
            <li><Link className="hover:text-blue-300 transition duration-200" to="/profile/edit">Edit Profile</Link></li>
            <li><Link className="hover:text-blue-300 transition duration-200" to="/post/create">Create Post</Link></li>
          </>
        ) : (
          <>
            <li><Link className="hover:text-blue-300 transition duration-200" to="/login">Login</Link></li>
            <li><Link className="hover:text-blue-300 transition duration-200" to="/signup">Sign up</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
