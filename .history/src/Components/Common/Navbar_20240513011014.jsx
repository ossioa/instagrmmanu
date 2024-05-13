// Navbar.js
import React, { useState } from 'react';
import SignOut from '../Auth/SignOut';
import Search from './Search';
import CreatePost from '../Post/CreatePost';
import Modal from '../../Modal/Modal';

const Navbar = () => {
  const [showCreatePost, setShowCreatePost] = useState(fa);

  return (
    <div className='flex justify-between items-center px-12 py-2 bg-gray-100 sticky top-0 z-20 shadow'>
      <div className='flex'>
        <img src='https://pngedits.com/public/uploads/preview/instagram-logo-png-image-download-11617068196c1gb8cm06w.png' alt='logo' className='w-28' />
      </div>
      <Search />
      <div className=''>
        <button
          onClick={() => setShowCreatePost(true)}
          className='bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out'
        >
          Create Post
        </button>
      </div>
      <SignOut/>
      <Modal isOpen={showCreatePost} closeModal={() => setShowCreatePost(false)}>
        <CreatePost />
      </Modal>
    </div>
  );
}

export default Navbar;
