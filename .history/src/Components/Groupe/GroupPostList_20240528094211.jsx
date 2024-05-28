import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import Post from '../Post';

const GroupPostList = ({ groupId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const groupRef = doc(db, 'groups', groupId);
    const unsubscribe = onSnapshot(collection(groupRef, 'posts'), (snapshot) => {
      const postsData = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          timestamp: data.timestamp ? data.timestamp.toDate() : new Date(),
          reactions: data.reactions || {}
        };
      });
      setPosts(postsData.sort((a, b) => b.timestamp - a.timestamp));
    });

    return () => unsubscribe();
  }, [groupId]);

  return (
    <div>
      {posts.map(post => (
        <Post
          key={post.id}
          id={post.id}
          photoURL={post.photoURL}
          caption={post.caption}
          reactions={post.reactions}
          userId={post.userId}
          timestamp={post.timestamp}
          groupId={groupId}  // Pass groupId to Post component if necessary
        />
      ))}
    </div>
  );
};

export default GroupPostList;
