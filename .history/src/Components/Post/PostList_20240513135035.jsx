import React, { useState, useEffect } from 'react';
import { db } from '../../config/firebase';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';

const Post = ({ id, photoURL, caption, likedBy = [] }) => {
    const [likes, setLikes] = useState(likedBy.length);
    const [isLiked, setIsLiked] = useState(false);
    const { currentUser } = useAuth();

    useEffect(() => {
        // Ensure currentUser is loaded and update like status
        if (currentUser && likedBy) {
            setIsLiked(likedBy.includes(currentUser.uid));
        }
    }, [currentUser, likedBy]);

    const toggleLike = async () => {
        if (!currentUser) {
            console.error("No user logged in!");
            return;
        }

        const postRef = doc(db, "posts", id);
        const updatedLikedBy = isLiked
            ? arrayRemove(currentUser.uid)
            : arrayUnion(currentUser.uid);

        try {
            await updateDoc(postRef, { likedBy: updatedLikedBy });
            setLikes(prev => isLiked ? prev - 1 : prev + 1);
            setIsLiked(!isLiked);
        } catch (error) {
            console.error("Error updating like: ", error);
        }
    };

    return (
        <div className="border rounded-lg p-4 shadow-lg mb-4">
            <img src={photoURL} alt="Post" className="w-full h-auto" />
            <div className="py-2">
                <p>{caption}</p>
                <div className="flex items-center justify-between mt-2">
                    <button onClick={toggleLike} className={`p-2 ${isLiked ? 'text-red-500' : 'text-gray-500'}`}>
                        {isLiked ? '❤️' : '🤍'} Like
                    </button>
                    <span>{likes} Likes</span>
                </div>
            </div>
        </div>
    );
};

export default Post;
