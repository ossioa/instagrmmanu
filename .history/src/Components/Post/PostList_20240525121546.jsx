import React, { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../config/firebase';
import Post from './Post'; 

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fonction de nettoyage pour supprimer l'écouteur lorsque le composant est démonté
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
      setPosts(postsData.sort((a, b) => b.timestamp - a.timestamp));  // Trier les posts par date décroissante
    });

    // Retourne la fonction de nettoyage pour démonter l'écouteur
    return () => unsubscribe();
  }, []);

  return (
    <div>
      {posts.map(post => (
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
