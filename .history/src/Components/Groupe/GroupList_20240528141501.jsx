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
      <ul className="list-disc list-inside">
        {groups.map(group => (
          <li key={group.id} className="mb-2">
            <button 
              onClick={() => onSelectGroup(group.id)}
              className="btn btn-sm shadow bg-blue-500 text-white hover:text-black font-bold flex items-center"
            >
              <FaUsers className="mr-2" />
              {group.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupList;
