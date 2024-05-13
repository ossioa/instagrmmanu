import React from 'react';
import Navbar from './Components/Common/Navbar';
import PostList from './Components/Post/PostList';

const Home = ({ user }) => {
  return (
    <div>
      <div  className='min-h-screen bg-gradient-to-r from-green-400 via-yellow-500 to-blue-500 animate-gradient-x'>
        <Navbar user={user} />
        <main className="flex flex-col gap-x-4 mx-auto w-[70%] items-center">
            <PostList />
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
        </main>
      </div>
    </div>
  );
};

export default Home;
