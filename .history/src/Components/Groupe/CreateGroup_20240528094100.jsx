import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../config/firebase';
import { addDoc, collection } from 'firebase/firestore';

const CreateGroup = () => {
  const [groupName, setGroupName] = useState('');
  const { currentUser } = useAuth();
  const [error, setError] = useState('');

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    if (!groupName) {
      setError('Group name cannot be empty');
      return;
    }
    try {
      await addDoc(collection(db, 'groups'), {
        name: groupName,
        owner: currentUser.uid,
        members: {
          [currentUser.uid]: true
        }
      });
      setGroupName('');
    } catch (error) {
      console.error('Error creating group: ', error);
      setError('Failed to create group.');
    }
  };

  return (
    <form onSubmit={handleCreateGroup}>
      <input
        type="text"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        placeholder="Group Name"
      />
      <button type="submit">Create Group</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default CreateGroup;
