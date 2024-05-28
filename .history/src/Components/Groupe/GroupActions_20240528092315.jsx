import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../config/firebase';
import { doc, updateDoc, arrayUnion, arrayRemove, deleteDoc } from 'firebase/firestore';

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
      const memberRef = collection(db, 'users').where('email', '==', newMemberEmail);
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
    <div>
      <h2>{groupData.name}</h2>
      {currentUser.uid === groupData.owner && (
        <div>
          <h3>Manage Members</h3>
          <input
            type="email"
            value={newMemberEmail}
            onChange={(e) => setNewMemberEmail(e.target.value)}
            placeholder="New member email"
          />
          <button onClick={addMember}>Add Member</button>
          <ul>
            {Object.keys(groupData.members).map((memberId) => (
              <li key={memberId}>
                {memberId}
                {memberId !== groupData.owner && (
                  <button onClick={() => removeMember(memberId)}>Remove</button>
                )}
              </li>
            ))}
          </ul>
          <button onClick={deleteGroup}>Delete Group</button>
        </div>
      )}
    </div>
  );
};

export default GroupActions;
