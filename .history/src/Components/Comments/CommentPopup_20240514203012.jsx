// CommentPopup.jsx

import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import Comment from './Comment';

const CommentPopup = ({ postId, setShowComments }) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            const q = query(collection(db, "posts", postId, "comments"), where("postId", "==", postId));
            const querySnapshot = await getDocs(q);
            const commentsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setComments(commentsData);
        };

        fetchComments();
    }, [postId]);

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full">
                <h2 className="text-xl font-bold mb-4">Comments</h2>
                <div className="overflow-y-auto max-h-60">
                    {comments.length > 0 ? (
                        comments.map(comment => (
                            <Comment key={comment.id} commentId={comment.id} text={comment.text} userId={comment.userId} postId={postId} />
                        ))
                    ) : (
                        <p>No comments...</p>
                    )}
                </div>
                <button onClick={() => setShowComments(false)} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">Close</button>
            </div>
        </div>
    );
};

export default CommentPopup;
