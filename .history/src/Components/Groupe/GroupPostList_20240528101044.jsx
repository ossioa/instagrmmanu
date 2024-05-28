import React, { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../config/firebase';
import Post from '../Posts/Post'; // Assurez-vous que ce chemin est correct

const GroupPostList = ({ searchTerm, groupId }) => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    if (!groupId) {
      console.error('groupId is undefined');
      return;
    }

    const postsCollectionRef = collection(db, 'groups', groupId, 'posts');
    const unsubscribe = onSnapshot(postsCollectionRef, (snapshot) => {
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
      setFilteredPosts(postsData); 
    });

    return () => unsubscribe();
  }, [groupId]);

  useEffect(() => {
    if (searchTerm) {
      const lowercasedFilter = searchTerm.toLowerCase();
      const filteredData = posts.filter(item =>
        item.caption.toLowerCase().includes(lowercasedFilter)
      );
      setFilteredPosts(filteredData);
    } else {
      setFilteredPosts(posts);
    }
  }, [searchTerm, posts]);

  return (
    <div>
      {filteredPosts.map(post => (
        <Post
          key={post.id}
          id={post.id}
          photoURL={post.photoURL}
          caption={post.caption}
          reactions={post.reactions}
          userId={post.userId}
          timestamp={post.timestamp}
        />
      ))}
    </div>
  );
};

export default GroupPostList;
