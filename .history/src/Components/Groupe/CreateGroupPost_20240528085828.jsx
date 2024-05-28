import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../config/firebase';
import { addDoc, collection, doc } from 'firebase/firestore';

const CreateGroupPost = ({ groupId }) => {
  const [caption, setCaption] = useState('');
  const { currentUser } = useAuth();
  const [error, setError] = useState('');

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!caption) {
      setError('Caption cannot be empty');
      return;
    }
    try {
      const groupRef = doc(db, 'groups', groupId);
      await addDoc(collection(groupRef, 'posts'), {
        caption: caption,
        userId: currentUser.uid,
        timestamp: new Date(),
        likedBy: [],
        comments: []
      });
      setCaption('');
    } catch (error) {
      console.error('Error creating post: ', error);
      setError('Failed to create post.');
    }
  };

  return (
    <form onSubmit={handleCreatePost}>
      <input
        type="text"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        placeholder="What's on your mind?"
      />
      <button type="submit">Post</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default CreateGroupPost;
