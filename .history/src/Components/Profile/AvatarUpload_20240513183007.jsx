import React, { useState } from 'react';
import { storage, db } from '../../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';

const AvatarUpload = () => {
  const [file, setFile] = useState(null);
  const [userId, setUserId] = useState(''); // Ajouter un state pour userId

  const handleUploadStart = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUploadSuccess = async () => {
    if (!userId) {
      alert("Please enter a user ID.");
      return;
    }
    const storageRef = ref(storage, `avatars/${userId}/avatar`);
    const snapshot = await uploadBytes(storageRef, file);
    const photoURL = await getDownloadURL(snapshot.ref);
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, { avatar: photoURL });
    alert("Avatar uploaded successfully!");
  };

  return (
    <div className='flex flex-col justify-center items-center'>
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
