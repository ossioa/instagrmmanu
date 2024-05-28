import React, { useState } from 'react';
import SignOut from '../Auth/SignOut';
import Search from './Search';
import CreatePost from '../Post/CreatePost';
import AvatarUpload from '../Profile/AvatarUpload'; 
import Modal from '../../Modal/Modal';
import AvatarDisplay from '../Profile/AvatarDisplay'; 
import { useAuth } from '../../contexts/AuthContext'; 
import CreateGroup from '../Groupe/CreateGroup'; // Assurez-vous d'importer CreateGroup
import { FaPlus } from 'react-icons/fa'; // Importer l'icône

const Navbar = ({ onSearch }) => {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showAvatarUpload, setShowAvatarUpload] = useState(false); 
  const [showCreateGroup, setShowCreateGroup] = useState(false); // État pour le modal de création de groupe
  const { currentUser } = useAuth(); 
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className={`flex justify-between items-center px-4 py-2 bg-gray-100 sticky top-0 z-20 shadow sm:px-8 md:px-12 ${isOpen ? 'hidden md:flex' : 'flex'}`}>
        <div className='flex items-center space-x-4 sm:space-x-8 md:space-x-12'>
          <img src='https://toppng.com/uploads/preview/instagram-icon-logo-social-media-icon-png-and-vector-ico-115630611667i1r9uaklh.png' alt='logo' className='w-12' />
          <span className=' font-extrabold text-blue-800 text-start '>INSTAGRAM 241</span>
        </div>
        <div className='hidden md:flex justify-center flex-grow'>
          <Search onSearch={onSearch} />
        </div>
        <div className='flex justify-between gap-x-4 items-center'>
          <button
            onClick={() => setShowAvatarUpload(true)}
            className='bg-blue- text-white rounded-full transition duration-300'
            title="Upload Avatar"
          > 
            {currentUser && <AvatarDisplay userId={currentUser.uid} />} 
          </button>
          <button
            onClick={() => setShowCreateGroup(true)}
            className='bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out flex items-center gap-y-2'
          >
            <FaPlus className="mr-2" /> Create Group
          </button>
          <button
            onClick={() => setShowCreatePost(true)}
            className='bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out flex flex-col items-center gap-y-2'
          >
            Posted
          </button>
          <SignOut />
          <Modal isOpen={showCreatePost} closeModal={() => setShowCreatePost(false)}>
            <CreatePost />
          </Modal>
          <Modal isOpen={showAvatarUpload} closeModal={() => setShowAvatarUpload(false)}>
            <AvatarUpload />
          </Modal>
          <Modal isOpen={showCreateGroup} closeModal={() => setShowCreateGroup(false)}>
            <CreateGroup />
          </Modal>
        </div>
        <div className='md:hidden'>
          <button onClick={() => setIsOpen(!isOpen)}>
            <svg viewBox="0 0 20 20" fill="currentColor" className="menu w-12 h-12">
              <path fillRule="evenodd" d="M2 5a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1zm0 6a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1zm1 5a1 1 0 100 2h14a1 1 0 100-2H3z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </nav>
      {isOpen && (
        <div className='flex justify-between items-center w-full px-4 py-2 bg-gray-100 sticky top-0 z-20 shadow md:hidden'>
          <button
            onClick={() => setShowAvatarUpload(true)}
            className='bg-blue- text-white rounded-full transition duration-300'
            title="Upload Avatar"
          > 
            {currentUser && <AvatarDisplay userId={currentUser.uid} />} 
          </button>
          <Modal isOpen={showAvatarUpload} closeModal={() => setShowAvatarUpload(false)}>
            <AvatarUpload />
          </Modal>
          <button
            onClick={() => setShowCreateGroup(true)}
            className='bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out flex flex-col items-center gap-y-2'
          >
            <FaPlus className="mr-2" /> Create Group
          </button>
          <Modal isOpen={showCreateGroup} closeModal={() => setShowCreateGroup(false)}>
            <CreateGroup />
          </Modal>
          <button
            onClick={() => setShowCreatePost(true)}
            className='bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out flex flex-col items-center gap-y-2'
          >
            Create Post
          </button>
          <Modal isOpen={showCreatePost} closeModal={() => setShowCreatePost(false)}>
            <CreatePost />
          </Modal>
          <SignOut />
        </div>
      )}
    </>
  );
}

export default Navbar;
