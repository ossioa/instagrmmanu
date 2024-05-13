import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { formatDistanceToNow } from 'date-fns';  // npm install date-fns pour utiliser cette fonction

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const postsData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          timestamp: data.timestamp ? data.timestamp.toDate() : new Date()
        };
      });
      setPosts(postsData);
    };

    fetchPosts();
  }, []);

  return (
    <div>
      {posts.map(post => (
        <div key={post.id} style={{ marginBottom: '20px' }}>
          <img src={post.photoURL} alt="Post" style={{ width: '100%' }} />
          <p>{post.caption}</p>
          <small>{formatDistanceToNow(post.timestamp)} ago</small>  {/* Affichage du temps écoulé depuis la création du post */}
          <div>
            <button>👍 {post.likes}</button> {/* Bouton pour liker */}
            <span> - {post.comments.length} comments</span> {/* Affichage du nombre de commentaires */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
