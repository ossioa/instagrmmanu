import React, { useState } from 'react';
import { storage, db } from '../../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc, setDoc, getDoc } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';
import { AiOutlineCloudUpload, AiOutlineCheckCircle } from 'react-icons/ai';

const AvatarUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const { currentUser } = useAuth();

  // Fonction de gestion de la sélection de fichier
  const handleFileSelection = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  // Fonction de gestion de l'upload
  const handleFileUpload = async () => {
    // Vérification de la sélection d'un fichier
    if (!file) {
      setMessage('Please select an image.');
      return;
    }

    // Vérification que l'utilisateur est connecté
    if (!currentUser) {
      setMessage('You must be logged in to update your avatar.');
      return;
    }

    // Référence dans le stockage Firebase
    const avatarRef = ref(storage, `users/${currentUser.uid}/avatar`);

    try {
      // Upload du fichier vers Firebase Storage
      const snapshot = await uploadBytes(avatarRef, file);
      const avatarURL = await getDownloadURL(snapshot.ref);

      // Référence du document utilisateur dans Firestore
      const userDocRef = doc(db, 'users', currentUser.uid);
      const docSnapshot = await getDoc(userDocRef);

      // Création ou mise à jour du document utilisateur
      if (docSnapshot.exists()) {
        await updateDoc(userDocRef, { avatar: avatarURL });
      } else {
        await setDoc(userDocRef, { avatar: avatarURL }, { merge: true });
      }

      // Message de succès et réinitialisation du fichier sélectionné
      setMessage('Avatar updated successfully.');
      setFile(null);
    } catch (error) {
      console.error('Error updating avatar:', error);
      setMessage('Failed to update avatar.');
    }
  };

  return (
    <div className='flex flex-col justify-center items-center'>
      <label htmlFor="avatar-upload" className='mb-2 cursor-pointer flex flex-col items-center'>
        <AiOutlineCloudUpload className='text-3xl' />
        <span className='ml-2'>Choose Avatar</span>
      </label>
      <input 
        id="avatar-upload" 
        type="file" 
        onChange={handleFileSelection} 
        className='hidden' 
      />
      <button 
        onClick={handleFileUpload} 
        className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 flex items-center'
      >
        <AiOutlineCheckCircle className='text-xl' />
        <span className='ml-2'>Update Avatar</span>
      </button>
      {message && <p className='text-red-500 text-sm font-bold mt-2'>{message}</p>}
    </div>
  );
};

export default AvatarUpload;
