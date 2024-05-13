import React from 'react';
import Navbar from './Components/Common/Navbar';
import PostList from './Components/Post/PostList';

const Home = () => {
  return (
    <div>
      <div  className=' bg-red- bg-gradient-to-r from-green-400 via-yellow-500 to-blue-500 animate-gradient-x'>
        <Navbar />
        <div className="container mx-auto mt-4">
            <PostList />
        </div>
      </div>
    </div>
  );
};

export default Home;
