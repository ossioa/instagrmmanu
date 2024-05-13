import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage, db } from '../../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';
import { FiUpload, FiSend } from 'react-icons/fi';

const CreatePost = () => {
  const [caption, setCaption] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  // Reprise automatique de la création du post après connexion
  useEffect(() => {
    const savedData = sessionStorage.getItem('postCreationData');
    if (savedData && currentUser) {
      const { fileData, caption } = JSON.parse(savedData);
      sessionStorage.removeItem('postCreationData'); // Nettoyage après récupération
      setFile(new File([fileData], fileData.name));
      setCaption(caption);
      handleSubmit(); // Appel de la création de post après connexion
    }
  }, [currentUser]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(''); // Clear any existing error when a new file is selected
    } else {
      setError('Please select a file to upload.');
    }
  };

  const handleCaptionChange = (event) => {
    setCaption(event.target.value);
  };

  const handleSubmit = async (event) => {
    if (event) event.preventDefault(); // Prévenir le comportement par défaut si l'événement existe

    if (!file) {
      setError("Please select a file to upload.");
      return;
    }
    if (!caption) {
      setError("Please enter a caption for your post.");
      return;
    }
    if (!currentUser) {
      // Stockage des données en attente avant de naviguer vers la connexion
      sessionStorage.setItem('postCreationData', JSON.stringify({ file, caption }));
      navigate('/login'); // Redirection vers la page de connexion
      return;
    }

    setError(''); // Clear previous errors
    try {
      const fileRef = ref(storage, `posts/${Date.now()}_${file.name}`); // Unique path
      const snapshot = await uploadBytes(fileRef, file);
      const photoURL = await getDownloadURL(snapshot.ref);

      const newPost = {
        photoURL,
        caption,
        userId: currentUser.uid,
        timestamp: serverTimestamp(),
        likes: 0,
        comments: 0,
        likedBy: []
      };

      await addDoc(collection(db, 'posts'), newPost);
      navigate('/'); // Navigate to the home page or feed page after successful post creation
    } catch (error) {
      console.error('Error creating post: ', error);
      setError(`Error creating post: ${error.message}`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-center">Create New Post</h2>
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
        >
          <FiSend />
          Post
        </button>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default CreatePost;
