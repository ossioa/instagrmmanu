import React, { useState } from 'react';
import Navbar from './Components/Common/Navbar';
import PostList from './Components/Post/PostList';
import GroupPage from './Components/Groupe/GroupPage';
import GroupList from './Components/Groupe/GroupList'; // Importer GroupList

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroupId, setSelectedGroupId] = useState(null); // État pour le groupe sélectionné

  return (
    <div>
      <div className='min-h-screen bg-gradient-to-r from-green-400 via-yellow-500 to-blue-500 animate-gradient-x'>
        <Navbar onSearch={setSearchTerm} />
        <main className="mx-auto sm:w-full md:w-[60%] lg:w-[45%] p-5">
          <GroupList onSelectGroup={setSelectedGroupId} />
          {selectedGroupId ? (
            <GroupPage groupId={selectedGroupId} />
          ) : (
            <PostList searchTerm={searchTerm} />
          )}
        </main>
      </div>
    </div>
  );
};

export default Home;
