import React from 'react';
import Navbar from './Components/Common/Navbar';
import PostList from './Components/Post/PostList';

const Home = ({ children, user }) => {
  return (
    <div>
      <div  className='min-h-screen bg-gradient-to-r from-green-400 via-yellow-500 to-blue-500 animate-gradient-x'>
        <Navbar user={user} />
        <main className=" mx-auto w-[45%]  mt-4 m">
            <PostList />  
            {children}          
        </main>
      </div>
    </div>
  );
};

export default Home;
