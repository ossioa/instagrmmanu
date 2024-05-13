import React from 'react';
import Navbar from './Components/Common/Navbar';
import PostList from './Components/Post/PostList';
import Post from './Components/Post/Post';

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-4">
          <Post/>
          <PostList />
      </div>
    </div>
  );
};

export default Home;
