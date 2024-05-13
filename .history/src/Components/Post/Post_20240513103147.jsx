import React, { useState, useEffect } from 'react';
import { db } from '../../config/firebase';
import { doc, updateDoc, arrayUnion, arrayRemove, deleteDoc } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';

const Post = ({ id, photoURL, caption, likedBy }) => {
    const [likes, setLikes] = useState(likedBy.length);
    const [isLiked, setIsLiked] = useState(false);
    const { currentUser } = useAuth();
    const [error, setError] = useState('');

    useEffect(() => {
        // Vérifie si l'utilisateur actuel a aimé le post
        setIsLiked(likedBy.includes(currentUser?.uid));
    }, [likedBy, currentUser]);

    const toggleLike = async () => {
        if (!currentUser) {
            setError("You must be logged in to like posts.");
            return;
        }

        const postRef = doc(db, "posts", id);
        const newIsLiked = !isLiked;  // Optimistic update
        setIsLiked(newIsLiked);
        setLikes((prevLikes) => prevLikes + (newIsLiked ? 1 : -1));  // Optimistic update

        try {
            if (newIsLiked) {
                await updateDoc(postRef, { likedBy: arrayUnion(currentUser.uid) });
            } else {
                await updateDoc(postRef, { likedBy: arrayRemove(currentUser.uid) });
            }
        } catch (error) {
            console.error("Error updating like: ", error);
            setError("Failed to update like.");
            // Revert optimistic updates in case of error
            setIsLiked(!newIsLiked);
            setLikes((prevLikes) => prevLikes + (!newIsLiked ? 1 : -1));
        }
    };

    const deletePost = async () => {
        if (!currentUser) {
            setError("You must be logged in to delete posts.");
            return;
        }

        const postRef = doc(db, "posts", id);
        try {
            await deleteDoc(postRef);
            alert("Post deleted successfully."); // Optionally, navigate or update UI here
        } catch (error) {
            console.error("Error deleting post: ", error);
            setError("Failed to delete post.");
        }
    };

    return (
        <div className="border rounded-lg p-4 shadow-lg mb-4 bg-gray-100">
            <img src={photoURL} alt="Post" className="w-full h-auto" />
            <div className="py-2">
                <p>{caption}</p>
                <div className="flex items-center justify-between mt-2">
                    <button onClick={toggleLike} disabled={!currentUser} className={`p-2 ${isLiked ? 'text-red-500' : 'text-gray-500'}`}>
                        {isLiked ? '❤️' : '🤍'} Like
                    </button>
                    <button onClick={deletePost} disabled={!currentUser || currentUser.uid !== post.userId} className="p-2 text-red-600">
                        Delete Post
                    </button>
                    <span>{likes} Likes</span>
                </div>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
        </div>
    );
};

export default Post;
