import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../config/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { FaPlus } from 'react-icons/fa';

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
    <form onSubmit={handleCreateGroup} className="border rounded-lg p-4 shadow-lg mb-4 bg-gray-100">
      <input
        type="text"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        placeholder="Group Name"
        className="input input-bordered w-full mb-2"
      />
      <button type="submit" className="btn btn-sm mt-2 shadow bg-green-500 text-white hover:text-black font-bold">
        Create Group <FaPlus className="ml-2" />
      </button>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </form>
  );
};

export default CreateGroup;
