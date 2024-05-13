import React from 'react';
import {  useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase'; // Ensure this is correctly imported
import { signOut } from 'firebase/auth';
import SignOut from '../Auth/SignOut';
import EditProfile from '../EditProfile/EditeProfile';

const Navbar = () => {
  //const { currentUser } = useAuth();
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
    <div className='flex justify-between items-center px-12 py-2 bg-gray-100 sticky top-0 z-20 shadow'>
      <div className='flex'>
        <img src='https://pngedits.com/public/uploads/preview/instagram-logo-png-image-download-11617068196c1gb8cm06w.png' alt='logo' className='w-28' />
      </div>
      {/* <Search /> Uncomment this line if the Search component is defined elsewhere */}
      <div className='flex items-center justify-between gap-x-3'>
        <button className='text-white bg-blue-600 hover:bg-green-600 transform transition duration-500 ease-in-out hover:scale-110 font-bold px-2 py-0 shadow rounded text-[18px]'><EditProfile/></button>
        <button className='text-white bg-violet-900 hover:bg-yellow-500 transform transition duration-500 ease-in-out hover:scale-110 font-bold px-2 py-0 shadow rounded text-[18px]'><CreatePost/></button>
      </div>
        <SignOut/>
    </div>
  );
}

export default Navbar;
