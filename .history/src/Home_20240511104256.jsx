import React from 'react';
import Navbar from 
import PostList from './Components/Post/PostList';

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-4">
        <h1 className="text-xl font-bold text-center">Welcome to My Instagram Clone!</h1>
        <PostList />
      </div>
    </div>
  );
};

export default Home;
