import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase'; // Ensure this is correctly imported
import SignOut from '../Auth/SignOut';

const Navbar = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Handling navigation to different parts of the application
  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <div className='flex justify-between items-center px-12 py-2 bg-gray-100 sticky top-0 z-20 shadow'>
      <div className='flex'>
        <img src='https://pngedits.com/public/uploads/preview/instagram-logo-png-image-download-11617068196c1gb8cm06w.png' alt='logo' className='w-28' />
      </div>
      <div className='flex items-center justify-between gap-x-4'>
        <button
          onClick={() => navigateTo('/edit-profile')}
          className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out'
        >
          Edit Profile
        </button>
        <button
          onClick={() => navigateTo('/create-post')}
          className='bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out'
        >
          Create Post
        </button>
      </div>
      <SignOut/>
    </div>
  );
}

export default Navbar;
