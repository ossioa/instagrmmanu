import React, { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../config/firebase';
import './App.css'

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
    <div>
      <h2>Groups</h2>
      <ul>
        {groups.map(group => (
          <li key={group.id}>
            <button onClick={() => onSelectGroup(group.id)}>
              {group.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupList;
