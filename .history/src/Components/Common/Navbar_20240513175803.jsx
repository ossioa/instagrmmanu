import React, { useState } from 'react';
import SignOut from '../Auth/SignOut';
import Search from './Search';
import CreatePost from '../Post/CreatePost';
import AvatarUpload from '../Profile/AvatarUpload'; 
import Modal from '../../Modal/Modal';
import { FiUser } from 'react-icons/fi'; 

const Navbar = () => {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showAvatarUpload, setShowAvatarUpload] = useState(false); // État pour contrôler l'affichage du Modal AvatarUpload

  return (
    <div className='flex justify-between items-center px-12 py-2 bg-gray-100 sticky top-0 z-20 shadow'>
      <div className='flex'>
        <img src='https://pngedits.com/public/uploads/preview/instagram-logo-png-image-download-11617068196c1gb8cm06w.png' alt='logo' className='w-28' />
      </div>
      <Search />
      <div className='flex justify-end gap-x-4'>
        <button
          onClick={() => setShowAvatarUpload(true)}
          className='text-white bg-blue-500 p-2 rounded-full hover:bg-blue-600 transition duration-300'
          title="Upload Avatar"
        >
          <FiUser size="24px" />
        </button>
        <button
          onClick={() => setShowCreatePost(true)}
          className='bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out '
        >
          Create Post
        </button>
        <SignOut/>
        <Modal isOpen={showCreatePost} closeModal={() => setShowCreatePost(false)}>
          <CreatePost />
        </Modal>
        <Modal isOpen={showAvatarUpload} closeModal={() => setShowAvatarUpload(false)}>
          <AvatarUpload />
        </Modal>
      </div>
    </div>
  );
}

export default Navbar;
