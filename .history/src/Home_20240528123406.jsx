import React, { useState } from 'react';
import Navbar from './Components/Common/Navbar';
import PostList from './Components/Post/PostList';
import GroupPage from './Components/Groupe/GroupPage';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroupId, setSelectedGroupId] = useState(null);

  const handleGroupSelect = (e) => {
    setSelectedGroupId(e.target.value);
  };

  return (
    <div>
      <div className='min-h-screen bg-gradient-to-r from-green-400 via-yellow-500 to-blue-500 animate-gradient-x'>
        <Navbar onSearch={setSearchTerm} />
        <main className="mx-auto sm:w-full md:w-[60%] lg:w-[45%] p-5">
          <PostList searchTerm={searchTerm} /> 
          <div>
            <label htmlFor="groupSelect">Select Group: </label>
            <select id="groupSelect" onChange={handleGroupSelect}>
              <option value="">--Select a Group--</option>
              <option value="group1">Group 1</option>
              <option value="group2">Group 2</option>
              <option value="group3">Group 3</option>
              {/* Add options dynamically based on available groups */}
            </select>
          </div>
          {selectedGroupId && <GroupPage groupId={selectedGroupId} />}
        </main>
      </div>
    </div>
  );
};

export default Home;
