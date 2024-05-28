import React, { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { FaUsers } from 'react-icons/fa';

const GroupList = ({ onSelectGroup }) => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'groups'), (snapshot) => {
      const groupsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setGroups(groupsData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="border rounded-lg p-4 shadow-lg mb-4 bg-gray-100">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        Groups <FaUsers className="ml-2 text-blue-500" />
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {groups.map(group => (
          <button 
            key={group.id} 
            onClick={() => onSelectGroup(group.id)}
            className="btn btn-sm shadow bg-blue-500 text-white hover:text-black font-bold flex items-center justify-center p-2 rounded"
          >
            <FaUsers className="mr-2" />
            {group.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GroupList;
