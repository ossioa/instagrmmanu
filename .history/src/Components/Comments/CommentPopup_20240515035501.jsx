// composant CommentPopup
import React, { useState, useEffect } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import Comment from './Comment';

const CommentPopup = ({ postId, setShowComments }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const q = query(collection(db, "posts", postId, "comments"));
      const querySnapshot = await getDocs(q);
      const commentsData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          timestamp: data.timestamp ? data.timestamp.toDate() : new Date(),
        };
      });
      setComments(commentsData);
    };

    fetchComments();
  }, [postId]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full">
        <button onClick={() => setShowComments(false)} className="absolute top-2 right-2 text-gray-500 hover:text-black">&times;</button>
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        <div>
          {comments.length > 0 ? (
            comments.map(comment => (
              <div key={comment.id} className="mb-2">
                <p>{comment.text}</p>
                <p className="text-xs text-gray-500">{comment.timestamp.toLocaleString()}</p>
              </div>
            ))
          ) : (
            <p>No comments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentPopup;
