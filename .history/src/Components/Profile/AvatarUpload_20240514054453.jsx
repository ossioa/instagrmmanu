import React, { useState } from 'react';
import { storage, db } from '../../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc, updateDoc, getDoc } from 'firebase/firestore';

const AvatarUpload = () => {
  const [file, setFile] = useState(null);
  const [userId, setUserId] = useState('');

  const handleUploadStart = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUploadSuccess = async () => {
    if (!userId) {
      alert("Please enter a user ID.");
      return;
    }
    try {
      const storageRef = ref(storage, `avatars/${userId}/avatar`);
      const snapshot = await uploadBytes(storageRef, file);
      const photoURL = await getDownloadURL(snapshot.ref);

      const userRef = doc(db, 'users', userId);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        // If the user document exists, update it
        await updateDoc(userRef, { avatar: photoURL });
      } else {
        // If the user document does not exist, create it
        await setDoc(userRef, { avatar: photoURL });
      }

      alert("Avatar uploaded successfully!");
    } catch (error) {
      console.error("Error uploading avatar: ", error);
      alert(`Failed to upload avatar: ${error.message}`);
    }
  };

  return (
    <div className='flex flex-col justify-center items-center w-'>
      <input type="file" onChange={handleUploadStart} />
      <input
        type="text"
        placeholder="Enter user ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <button onClick={handleUploadSuccess}>Upload Avatar</button>
    </div>
  );
};

export default AvatarUpload;
