import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Adjust the path as necessary
import { auth } from '../../config/firebase'; // Ensure this is correctly imported
import { signOut } from 'firebase/auth';

const Navbar = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleSignOut = async () => {
    try {
      await signOut(auth);  // Firebase sign out
      navigate('/login');   // Redirect to login after sign out
    } catch (error) {
      console.error('Sign out failed', error);
    }
  };






  

  return (
    <nav className="bg-blue-500 text-white p-4 shadow-md">
      <ul className="flex space-x-4 justify-center">
        <li><Link className="hover:text-blue-300 transition duration-200" to="/">Home</Link></li>
        {currentUser ? (
          <>
            <li><button onClick={handleSignOut} className="hover:text-blue-300 transition duration-200">Sign Out</button></li>
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
