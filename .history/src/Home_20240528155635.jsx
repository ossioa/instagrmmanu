import React, { useState } from 'react';
import { FaHome, FaUsers } from 'react-icons/fa';
import Navbar from './Components/Common/Navbar';
import PostList from './Components/Post/PostList';
import GroupList from './Components/Groupe/GroupList';
import GroupPage from './Components/Groupe/GroupPage';
import CreateGroup from './Components/Groupe/CreateGroup';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState('home'); // 'home' pour le fil principal, 'groups' pour la liste des groupes
  const [selectedGroupId, setSelectedGroupId] = useState(null);

  const handleGroupClick = () => {
    setView('groups');
  };

  const handleHomeClick = () => {
    setView('home');
  };

  const handleGroupSelect = (groupId) => {
    setSelectedGroupId(groupId);
    setView('groupPage');
  };

  const renderContent = () => {
    switch(view) {
      case 'home':
        return <PostList searchTerm={searchTerm} />;
      case 'groups':
        return (
          <div>
            <CreateGroup />
            <GroupList onSelectGroup={handleGroupSelect} />
          </div>
        );
      case 'groupPage':
        return <GroupPage groupId={selectedGroupId} />;
      default:
        return <PostList searchTerm={searchTerm} />;
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-r from-green-400 via-yellow-500 to-blue-500 animate-gradient-x'>
      <Navbar onSearch={setSearchTerm} />
      <main className="relative mx-auto sm:w-full md:w-[70%] lg:w-[45%] p-5 flex gap-5">
        <div className="flex-1">
          {renderContent()}
        </div>
        <div className="fixed right-0 top-20 flex justify-bweene gap-5 font-bold text-green-600">
          <button onClick={handleHomeClick} className="btn mx-5 font-bold text-green-600 flex items-center">
            <FaHome className="mr-2" /> Home
          </button>
          <button onClick={handleGroupClick} className="btn font-bold text-green-600 flex items-center">
            <FaUsers className="mr-2" /> Groups
          </button>
        </div>
      </main>
    </div>
  );
};

export default Home;
