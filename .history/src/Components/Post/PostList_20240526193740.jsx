import React, { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../config/firebase';
import Post from './Post'; 
import Search from '.'

const PostList = () => {
  const [posts, setPosts] = useState([]);
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
      setPosts(postsData.sort((a, b) => b.timestamp - a.timestamp));  
      setFilteredPosts(postsData.sort((a, b) => b.timestamp - a.timestamp));  // Initialiser les posts filtrés avec tous les posts
    });

    return () => unsubscribe();
  }, []);

  // Fonction de gestion de la recherche
  const handleSearch = (searchValue) => {
    const filtered = posts.filter(post =>
      post.caption.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  return (
    <div>
      <Search handleSearch={handleSearch} />
      {filteredPosts.map(post => (
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
