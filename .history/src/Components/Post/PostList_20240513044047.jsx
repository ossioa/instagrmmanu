import React, { useState, useEffect } from 'react';
import { db } from '../../config/firebase';
import { doc, updateDoc, deleteDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';

const Post = ({ id, photoURL, caption, likedBy, userId, userName, userProfilePic }) => {
    const [likes, setLikes] = useState(likedBy.length);
    const [isLiked, setIsLiked] = useState(false);
    const { currentUser } = useAuth();
    const [error, setError] = useState('');

    useEffect(() => {
        // Vérifie si l'utilisateur actuel est défini avant de vérifier s'il aime le post
        if (currentUser) {
            setIsLiked(likedBy.includes(currentUser.uid));
        }
    }, [likedBy, currentUser]);

    const toggleLike = async () => {
        if (!currentUser) {
            setError("You must be logged in to like posts.");
            return;
        }

        const postRef = doc(db, "posts", id);
        try {
            if (isLiked) {
                await updateDoc(postRef, { likedBy: arrayRemove(currentUser.uid) });
                setLikes(prev => prev - 1);
                setIsLiked(false);
            } else {
                await updateDoc(postRef, { likedBy: arrayUnion(currentUser.uid) });
                setLikes(prev => prev + 1);
                setIsLiked(true);
            }
        } catch (error) {
            console.error("Error updating like: ", error);
            setError("Failed to update like.");
        }
    };

    const deletePost = async () => {
        if (currentUser && currentUser.uid === userId) {
            try {
                await deleteDoc(doc(db, "posts", id));
                // Optionally, navigate or update the UI here
            } catch (error) {
                console.error("Error deleting post: ", error);
                setError("Failed to delete post.");
            }
        }
    };

    return (
        <div className="border rounded-lg p-4 shadow-lg mb-4">
            <div className="flex items-center space-x-2 mb-2">
                <img src={userProfilePic || 'default-profile.png'} alt="Author" className="w-10 h-10 rounded-full" />
                <p className="font-semibold">{userName || "Unknown"}</p>
            </div>
            <img src={photoURL} alt="Post" className="w-full h-auto" />
            <div className="py-2">
                <p>{caption}</p>
                <div className="flex items-center justify-between mt-2">
                    <button onClick={toggleLike} disabled={!currentUser} className={`p-2 ${isLiked ? 'text-red-500' : 'text-gray-500'}`}>
                        {isLiked ? '❤️' : '🤍'} Like
                    </button>
                    <span>{likes} Likes</span>
                    {currentUser && currentUser.uid === userId && (
                        <button onClick={deletePost} className="p-2 text-red-500">
                            Delete
                        </button>
                    )}
                </div>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
        </div>
    );
};

export default Post;
