import React, { useState } from 'react';
import { storage, db } from '../../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';

const AvatarUpload = () => {
  const [file, setFile] = useState(null);
  const { currentUser } = useAuth();

  const handleUploadStart = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUploadSuccess = async () => {
    const storageRef = ref(storage, `users/${currentUser.uid}/avatar`);
    const snapshot = await uploadBytes(storageRef, file);
    const photoURL = await getDownloadURL(snapshot.ref);
    const userRef = doc(db, 'users', currentUser.uid);
    await updateDoc(userRef, { avatar: photoURL });
  };

  return (
    <div className=' flx flex'>
      <input type="file" onChange={handleUploadStart} />
      <button onClick={handleUploadSuccess}>Upload Avatar</button>
    </div>
  );
};

export default AvatarUpload;
