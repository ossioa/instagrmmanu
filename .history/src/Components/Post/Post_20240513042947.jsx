import React from 'react';
import { db } from '../../config/firebase';
import { doc, updateDoc, deleteDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

const Post = ({ post, user }) => {
  const toggleLike = async () => {
    const postRef = doc(db, 'posts', post.id);
    if (post.likedBy.includes(user.uid)) {
      await updateDoc(postRef, { likedBy: arrayRemove(user.uid) });
    } else {
      await updateDoc(postRef, { likedBy: arrayUnion(user.uid) });
    }
  };

  const deletePost = async () => {
    if (user.uid === post.userId) {
      const postRef = doc(db, 'posts', post.id);
      await deleteDoc(postRef);
    }
  };

  return (
    <div>
      <img src={post.photoURL} alt="Post" />
      <p>{post.caption}</p>
      <button onClick={toggleLike}>{post.likedBy.includes(user.uid) ? 'Unlike' : 'Like'}</button>
      {user.uid === post.userId && <button onClick={deletePost}>Delete</button>}
    </div>
  );
};

export default Post;
