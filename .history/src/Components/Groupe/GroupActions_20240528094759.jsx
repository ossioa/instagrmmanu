import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../config/firebase';
import { doc, updateDoc, deleteField, deleteDoc, getDocs, collection, query, where, onSnapshot } from 'firebase/firestore'; // Ajoutez 'onSnapshot' ici
import { FaUserPlus, FaUserMinus, FaTrashAlt } from 'react-icons/fa';

const GroupActions = ({ groupId }) => {
  const { currentUser } = useAuth();
  const [groupData, setGroupData] = useState(null);
  const [error, setError] = useState('');
  const [newMemberEmail, setNewMemberEmail] = useState('');

  useEffect(() => {
    const groupRef = doc(db, 'groups', groupId);
    const unsubscribe = onSnapshot(groupRef, (doc) => {
      setGroupData(doc.data());
    });

    return () => unsubscribe();
  }, [groupId]);

  const addMember = async () => {
    if (!newMemberEmail) {
      setError('Email cannot be empty');
      return;
    }
    try {
      const memberRef = query(collection(db, 'users'), where('email', '==', newMemberEmail));
      const memberSnapshot = await getDocs(memberRef);
      if (memberSnapshot.empty) {
        setError('User not found');
        return;
      }
      const memberId = memberSnapshot.docs[0].id;
      const groupRef = doc(db, 'groups', groupId);
      await updateDoc(groupRef, {
        [`members.${memberId}`]: true
      });
      setNewMemberEmail('');
    } catch (error) {
      console.error('Error adding member: ', error);
      setError('Failed to add member.');
    }
  };

  const removeMember = async (memberId) => {
    try {
      const groupRef = doc(db, 'groups', groupId);
      await updateDoc(groupRef, {
        [`members.${memberId}`]: deleteField()
      });
    } catch (error) {
      console.error('Error removing member: ', error);
      setError('Failed to remove member.');
    }
  };

  const deleteGroup = async () => {
    if (currentUser.uid !== groupData.owner) {
      setError('Only the group owner can delete the group');
      return;
    }
    try {
      const groupRef = doc(db, 'groups', groupId);
      await deleteDoc(groupRef);
    } catch (error) {
      console.error('Error deleting group: ', error);
      setError('Failed to delete group.');
    }
  };

  if (!groupData) return null;

  return (
    <div className="border rounded-lg p-4 shadow-lg mb-4 bg-gray-100">
      <h2 className="text-xl font-bold mb-2">{groupData.name}</h2>
      {currentUser.uid === groupData.owner && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Manage Members</h3>
          <div className="mb-2">
            <input
              type="email"
              value={newMemberEmail}
              onChange={(e) => setNewMemberEmail(e.target.value)}
              placeholder="New member email"
              className="input input-bordered w-full mb-2"
            />
            <button onClick={addMember} className="btn btn-sm mt-2 shadow bg-blue-500 text-white hover:text-black font-bold">
              Add Member <FaUserPlus className="ml-2" />
            </button>
          </div>
          <ul>
            {Object.keys(groupData.members).map((memberId) => (
              <li key={memberId} className="flex justify-between items-center mb-2">
                {memberId}
                {memberId !== groupData.owner && (
                  <button onClick={() => removeMember(memberId)} className="btn btn-sm shadow bg-red-500 text-white hover:text-black font-bold">
                    Remove <FaUserMinus className="ml-2" />
                  </button>
                )}
              </li>
            ))}
          </ul>
          <button onClick={deleteGroup} className="btn btn-sm mt-2 shadow bg-red-600 text-white hover:text-black font-bold">
            Delete Group <FaTrashAlt className="ml-2" />
          </button>
        </div>
      )}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default GroupActions;
