import React from 'react';
import Navbar from './Components/Common/Navbar';
import PostList from './Components/Post/PostList';

const Home = () => {
  return (
    <div>
      <div  className='bg-gradient-to-r from-green-400 via-yellow-500 to-blue-500 animate-gradient-x'>
        <Navbar  />
        <main className=" mx-auto w-[70%] mt-4">
            <PostList />
        </main>
      </div>
    </div>
  );
};

export default Home;
