import React, { useEffect, useState } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

const GroupActions = ({ groupId }) => {
  const [groupData, setGroupData] = useState(null);
  const [newData, setNewData] = useState('');

  useEffect(() => {
    if (!groupId) {
      console.error('groupId is undefined');
      return;
    }

    const groupDocRef = doc(db, 'groups', groupId);

    const unsubscribe = onSnapshot(groupDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        setGroupData(docSnapshot.data());
      } else {
        console.error('No such document!');
      }
    }, (error) => {
      console.error('Error fetching document:', error);
    });

    return () => unsubscribe();
  }, [groupId]);

  const handleUpdate = async () => {
    if (!groupId) {
      console.error('groupId is undefined');
      return;
    }

    const groupDocRef = doc(db, 'groups', groupId);
    
    try {
      await setDoc(groupDocRef, { newData }, { merge: true });
      console.log('Document successfully updated!');
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  return (
    <div>
      <h2>Group Actions</h2>
      {groupData ? (
        <div>
          <p>Group Name: {groupData.name}</p>
          <p>Group Description: {groupData.description}</p>
        </div>
      ) : (
        <p>Loading group data...</p>
      )}
      <div>
        <input
          type="text"
          value={newData}
          onChange={(e) => setNewData(e.target.value)}
          placeholder="Enter new data"
        />
        <button onClick={handleUpdate}>Update Group Data</button>
      </div>
    </div>
  );
};

export default GroupActions;
