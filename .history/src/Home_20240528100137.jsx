import React, { useState } from 'react';
import Navbar from './Components/Common/Navbar';
import PostList from './Components/Post/PostList';
import G

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div>
      <div className='min-h-screen bg-gradient-to-r from-green-400 via-yellow-500 to-blue-500 animate-gradient-x'>
        <Navbar onSearch={setSearchTerm} />
        <main className="mx-auto sm:w-full md:w-[60%] lg:w-[45%] p-5">
            <PostList searchTerm={searchTerm} /> 
            <GroupPage/>             
        </main>
      </div>
    </div>
  );
};

export default Home;
