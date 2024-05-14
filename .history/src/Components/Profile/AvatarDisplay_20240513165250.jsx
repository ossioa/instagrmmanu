import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';

const AvatarDisplay = () => {
  const [avatarUrl, setAvatarUrl] = useState('');
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      const unsub = onSnapshot(doc(db, 'users', currentUser.uid), (doc) => {
        setAvatarUrl(doc.data().avatar);
      });
      return () => unsub();
    }
  }, [currentUser]);

  return (
    <div>
      {avatarUrl ? (
        <img src={avatarUrl} alt="User Avatar" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default AvatarDisplay;
