import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import Post from '../Post/Post';
import { FaTrash } from 'react-icons/fa';

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

  const handleDelete = async (postId) => {
    if (!groupId || !postId) {
      console.error('groupId or postId is undefined');
      return;
    }

    const postDocRef = doc(db, 'groups', groupId, 'posts', postId);

    try {
      await deleteDoc(postDocRef);
      console.log('Post successfully deleted!');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div>
      {filteredPosts.map(post => (
        <div key={post.id} className="border rounded-lg p-4 shadow-lg mb-4 bg-gray-100 relative">
          <Post
            id={post.id}
            photoURL={post.photoURL}
            caption={post.caption}
            reactions={post.reactions}
            userId={post.userId}
            timestamp={post.timestamp}
          />
          <button
            onClick={() => handleDelete(post.id)}
            className="absolute top-2 right-2 btn btn-sm shadow bg-red-500 text-white hover:text-black font-bold"
          >
            <FaTrash />
          </button>
        </div>
      ))}
    </div>
  );
};

export default GroupPostList;
