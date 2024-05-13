import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../config/firebase';
import Post from './Post';  // Assuming Post is the component we refined earlier

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q);
        const postsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp ? doc.data().timestamp.toDate() : new Date()
        }));
        setPosts(postsData);
      } catch (err) {
        console.error("Error fetching posts: ", err);
        setError("Failed to load posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading posts...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {posts.length > 0 ? (
        posts.map(post => (
          <Post
            key={post.id}
            id={post.id}
            photoURL={post.photoURL}
            caption={post.caption}
            likedBy={post.likedBy || []}
          />
        ))
      ) : (
        <div>No posts found.</div>
      )}
    </div>
  );
};

export default PostList;
