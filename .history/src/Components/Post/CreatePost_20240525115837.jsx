import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage, db } from '../../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc, collection, serverTimestamp, runTransaction } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';
import { FiUpload, FiSend } from 'react-icons/fi';
import imageCompression from 'browser-image-compression';

const CreatePost = () => {
  const [caption, setCaption] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError('');
    } else {
      setError('Please select a file to upload.');
    }
  };

  const handleCaptionChange = (event) => {
    setCaption(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!file) {
      setError("Please select a file to upload.");
      setLoading(false);
      return;
    }
    if (!caption) {
      setError("Please enter a caption for your post.");
      setLoading(false);
      return;
    }
    if (!currentUser) {
      setError("No user logged in. Please log in to create a post.");
      setLoading(false);
      return;
    }

    try {
      // Compress the image
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(file, options);

      const fileRef = ref(storage, `${currentUser.uid}/posts/${Date.now()}_${compressedFile.name}`);
      const snapshot = await uploadBytes(fileRef, compressedFile);
      const photoURL = await getDownloadURL(snapshot.ref);

      // Use transaction to ensure post creation
      await runTransaction(db, async (transaction) => {
        const newPostRef = collection(db, 'posts');
        await addDoc(newPostRef, {
          photoURL,
          caption,
          userId: currentUser.uid,
          userName: currentUser.displayName,
          userProfilePic: currentUser.photoURL,
          timestamp: serverTimestamp(),
          likes: 0,
          comments: 0,
          likedBy: []
        });
      });

      setSuccess('Post created successfully.');
      setCaption('');
      setFile(null);
      navigate('/');

    } catch (error) {
      console.error('Error creating post: ', error);
      setError(`Error creating post: ${error.message}`);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-center">Create a new Post</h2>
        <div className="flex flex-col">
          <label htmlFor="file-upload" className="cursor-pointer bg-blue-500 text-white rounded-md px-4 py-2 text-center hover:bg-blue-600 transition duration-200 flex justify-center items-center gap-2">
            <FiUpload />
            Upload Image
          </label>
          <input id="file-upload" type="file" onChange={handleFileChange} className="hidden" accept="image/*" />
        </div>
        <input
          type="text"
          value={caption}
          onChange={handleCaptionChange}
          placeholder="Enter a caption..."
          className="input input-bordered w-full p-2 border-gray-300 rounded"
        />
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out flex justify-center items-center gap-2"
          disabled={loading}
        >
          <FiSend />
          {loading ? 'Posting...' : 'Post'}
        </button>
        {success && <p className="text-green-500 text-center mt-2 font-bold">{success}</p>}
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default CreatePost;
