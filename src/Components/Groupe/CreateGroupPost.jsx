import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { db, storage } from '../../config/firebase';
import { addDoc, collection, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { FaPaperPlane, FaUpload, FaSpinner } from 'react-icons/fa';

const CreateGroupPost = ({ groupId }) => {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const { currentUser } = useAuth();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Réinitialise les messages de succès et d'erreur
  const resetFeedback = () => {
    setError('');
    setSuccess('');
  };

  // Fonction de création du post
  const handleCreatePost = async (e) => {
    e.preventDefault();
    resetFeedback();

    if (!caption) {
      setError('Caption cannot be empty');
      return;
    }

    let imageUrl = '';
    if (image) {
      setLoading(true);
      try {
        imageUrl = await uploadImage();
        setSuccess('Image uploaded successfully');
      } catch (error) {
        setError('Failed to upload image.');
        console.error('Error uploading image: ', error);
        setLoading(false);
        return;
      }
    }

    try {
      await savePostToFirestore(imageUrl);
      resetForm();
      setSuccess('Post created successfully');
    } catch (error) {
      setError('Failed to create post.');
      console.error('Error creating post: ', error);
    } finally {
      setLoading(false);
    }
  };

  // Fonction d'upload d'image
  const uploadImage = async () => {
    const imageRef = ref(storage, `groupPosts/${groupId}/${Date.now()}_${image.name}`);
    await uploadBytes(imageRef, image);
    return await getDownloadURL(imageRef);
  };

  // Fonction pour sauvegarder le post dans Firestore
  const savePostToFirestore = async (imageUrl) => {
    const groupRef = doc(db, 'groups', groupId);
    await addDoc(collection(groupRef, 'posts'), {
      caption,
      photoURL: imageUrl,
      userId: currentUser.uid,
      timestamp: new Date(),
      reactions: {},
      comments: []
    });
  };

  // Réinitialise le formulaire après la création du post
  const resetForm = () => {
    setCaption('');
    setImage(null);
  };

  return (
    <form onSubmit={handleCreatePost} className="border rounded-lg p-4 shadow-lg mb-4 bg-gray-100">
      {/* Champ de légende */}
      <input
        type="text"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        placeholder="What's on your mind?"
        className="input input-bordered w-full mb-2"
      />

      {/* Champ de téléchargement d'image */}
      <label className="input input-bordered w-full mb-2 flex items-center justify-between">
        <span>Upload Image</span>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="hidden"
        />
        <FaUpload className="ml-2" />
      </label>

      {/* Bouton de soumission du post */}
      <button type="submit" className="btn btn-sm mt-2 shadow bg-blue-500 text-white hover:text-black font-bold flex items-center" disabled={loading}>
        {loading ? (
          <FaSpinner className="animate-spin mr-2" />
        ) : (
          <>
            Post <FaPaperPlane className="ml-2" />
          </>
        )}
      </button>

      {/* Messages d'erreur et de succès */}
      {error && <p className="text-red-500 font-bold text-sm mt-2">{error}</p>}
      {success && <p className="text-green-500 font-bold text-sm mt-2">{success}</p>}
    </form>
  );
};

export default CreateGroupPost;
