import React from 'react';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useAuth } from '../../contexts/AuthContext';

const Comment = ({ commentId, text, userId, postId }) => {
    const { currentUser } = useAuth();

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this comment?")) {
            try {
                await deleteDoc(doc(db, "posts", postId, "comments", commentId));
                alert("Comment deleted successfully.");
            } catch (error) {
                console.error("Error deleting comment: ", error);
                alert("Failed to delete comment.");
            }
        }
    };

    return (
        <div className="p-2 border-b border-gray-300">
            <p>{text}</p>
            {currentUser && currentUser.uid === userId && (
                <button onClick={handleDelete} className="text-red-500 hover:text-red-700">
                    Delete
                </button>
            )}
        </div>
    );
};

export default Comment;
