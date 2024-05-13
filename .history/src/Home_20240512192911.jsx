import React from 'react';
import Navbar from './Components/Common/Navbar';
import PostList from './Components/Post/PostList';
import Post from './Components/Post/Post';

const Home = () => {
  // Mock data - in a real application, this data would be fetched from an API or state
  const postData = {
    id: '123',
    photoURL: 'https://via.placeholder.com/150',
    caption: 'This is a sample post',
    likedBy: ['user1', 'user2']
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-4">
          {/* Pass the required props to the Post component */}
          <Post id={postData.id} photoURL={postData.photoURL} caption={postData.caption} likedBy={postData.likedBy} />
          <PostList />
      </div>
    </div>
  );
};

export default Home;
