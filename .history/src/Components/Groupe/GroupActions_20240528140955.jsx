import React, { useEffect, useState } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { FaEdit, FaSave, FaSpinner } from 'react-icons/fa';

const GroupActions = ({ groupId }) => {
  const [groupData, setGroupData] = useState(null);
  const [newData, setNewData] = useState('');
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!groupId) {
      console.error('groupId is undefined');
      return;
    }

    const groupDocRef = doc(db, 'groups', groupId);

    const unsubscribe = onSnapshot(groupDocRef, (docSnapshot) => {
      setLoading(false);
      if (docSnapshot.exists()) {
        setGroupData(docSnapshot.data());
      } else {
        console.error('No such document!');
      }
    }, (error) => {
      setLoading(false);
      console.error('Error fetching document:', error);
    });

    return () => unsubscribe();
  }, [groupId]);

  const handleUpdate = async () => {
    if (!groupId) {
      console.error('groupId is undefined');
      return;
    }

    setUpdating(true);
    const groupDocRef = doc(db, 'groups', groupId);
    
    try {
      await setDoc(groupDocRef, { newData }, { merge: true });
      console.log('Document successfully updated!');
      setNewData('');
    } catch (error) {
      console.error('Error updating document:', error);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow-lg mb-4 bg-gray-100">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        Group Actions <FaEdit className="ml-2 text-blue-500" />
      </h2>
      {loading ? (
        <div className="flex items-center justify-center">
          <FaSpinner className="animate-spin text-blue-500 text-2xl" />
          <span className="ml-2">Loading group data...</span>
        </div>
      ) : groupData ? (
        <div>
          <p className="mb-2"><strong>Group Name:</strong> {groupData.name}</p>
          <p className="mb-4"><strong>Group Description:</strong> {groupData.description}</p>
        </div>
      ) : (
        <p>Error loading group data.</p>
      )}
      <div className="flex items-center">
        <input
          type="text"
          value={newData}
          onChange={(e) => setNewData(e.target.value)}
          placeholder="Enter new data"
          className="input input-bordered w-full mb-2 mr-2"
        />
        <button
          onClick={handleUpdate}
          className="btn btn-sm shadow bg-green-500 text-white hover:text-black font-bold flex items-center"
          disabled={updating}
        >
          {updating ? (
            <FaSpinner className="animate-spin mr-2" />
          ) : (
            <FaSave className="mr-2" />
          )}
          Update Group Data
        </button>
      </div>
    </div>
  );
};

export default GroupActions;
