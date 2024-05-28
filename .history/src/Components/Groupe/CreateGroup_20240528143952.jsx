import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { db, storage } from '../../config/firebase';
import { addDoc, collection, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { FaPaperPlane } from 'react-icons/fa';

const CreateGroupPost = ({ groupId }) => {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const { currentUser } = useAuth();
  const [error, setError] = useState('');

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!caption) {
      setError('Caption cannot be empty');
      return;
    }

    let imageUrl = '';
    if (image) {
      const imageRef = ref(storage, `groupPosts/${groupId}/${image.name}`);
      await uploadBytes(imageRef, image);
      imageUrl = await getDownloadURL(imageRef);
    }

    try {
      const groupRef = doc(db, 'groups', groupId);
      await addDoc(collection(groupRef, 'posts'), {
        caption: caption,
        photoURL: imageUrl,
        userId: currentUser.uid,
        timestamp: new Date(),
        reactions: {},
        comments: []
      });
      setCaption('');
      setImage(null);
    } catch (error) {
      console.error('Error creating post: ', error);
      setError('Failed to create post.');
    }
  };

  return (
    <form onSubmit={handleCreatePost} className="border rounded-lg p-4 shadow-lg mb-4 bg-gray-100">
      <input
        type="text"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        placeholder="What's on your mind?"
        className="input input-bordered w-full mb-2"
      />
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        className="input input-bordered w-full mb-2"
      />
      <button type="submit" className="btn btn-sm mt-2 shadow bg-blue-500 text-white hover:text-black font-bold">
        Post <FaPaperPlane className="ml-2" />
      </button>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </form>
  );
};

export default CreateGroupPost;
