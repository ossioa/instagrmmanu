import React from 'react';
import Navbar from './Components/Common/Navbar';
import PostList from './Components/Post/PostList';

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-4">
          <PostList />
          h
      </div>
    </div>
  );
};

export default Home;
