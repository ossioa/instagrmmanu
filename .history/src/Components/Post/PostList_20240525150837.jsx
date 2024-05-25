import React, { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../config/firebase';
import Post from './Post'; 

const PostList = ({ searchQuery }) => {
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'posts'), (snapshot) => {
      const postsData = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          timestamp: data.timestamp ? data.timestamp.toDate() : new Date(),
          likedBy: data.likedBy || [],  
          comments: data.comments || []  
        };
      });
      setFilteredPosts(postsData.sort((a, b) => b.timestamp - a.timestamp));
    });

    return () => unsubscribe();
  }, []);

  const filtered = filteredPosts.filter(post =>
    post.caption.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {filtered.map(post => (
        <Post
          key={post.id}
          id={post.id}
          photoURL={post.photoURL}
          caption={post.caption}
          likedBy={post.likedBy}
          userId={post.userId}
          timestamp={post.timestamp}
        />
      ))}
    </div>
  );
};

export default PostList;
