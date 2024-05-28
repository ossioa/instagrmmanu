import React, { useEffect, useState } from 'react';
import { doc, onSnapshot, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { FaTrash, FaEdit } from 'react-icons/fa';

const GroupActions = ({ groupId }) => {
  const [groupData, setGroupData] = useState(null);
  const [newGroupName, setNewGroupName] = useState('');
  const [editMode, setEditMode] = useState(false);

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
    if (!groupId || !newGroupName) {
      console.error('groupId or newGroupName is undefined');
      return;
    }

    const groupDocRef = doc(db, 'groups', groupId);

    try {
      await setDoc(groupDocRef, { name: newGroupName }, { merge: true });
      console.log('Group successfully renamed!');
      setEditMode(false);
      setNewGroupName('');
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  const handleDelete = async () => {
    if (!groupId) {
      console.error('groupId is undefined');
      return;
    }

    const groupDocRef = doc(db, 'groups', groupId);

    try {
      await deleteDoc(groupDocRef);
      console.log('Group successfully deleted!');
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow-lg mb-4 bg-gray-100">
      <h2 className="text-xl font-bold mb-4">Group Actions</h2>
      {groupData ? (
        <div>
          <p>Group Name: {groupData.name}</p>
          {editMode ? (
            <div className="flex ju items-center">
              <input
                type="text"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                placeholder="Enter new group name"
                className="input input-bordered w-full mb-2"
              />
              <button onClick={handleUpdate} className="btn btn-sm ml-2 shadow bg-green-500 text-white hover:text-black font-bold">
                Save <FaEdit className="ml-2" />
              </button>
            </div>
          ) : (
            <button onClick={() => setEditMode(true)} className="btn btn-sm mt-2 shadow bg-blue-500 text-white hover:text-black font-bold">
              Rename Group <FaEdit className="ml-2" />
            </button>
          )}
          <button onClick={handleDelete} className="btn btn-sm mt-2 shadow bg-red-500 text-white hover:text-black font-bold">
            Delete Group <FaTrash className="ml-2" />
          </button>
        </div>
      ) : (
        <p>Loading group data...</p>
      )}
    </div>
  );
};

export default GroupActions;
