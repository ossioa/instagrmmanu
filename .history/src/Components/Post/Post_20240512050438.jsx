import React, { useState } from 'react';
import { db } from '../../config/firebase';  // Adjust the import path as necessary
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

const Post = ({ id, photoURL, caption, likedBy = [], currentUser }) => {
    const [likes, setLikes] = useState(likedBy ? likedBy.length : 0);
    const [isLiked, setIsLiked] = useState(currentUser ? likedBy.includes(currentUser.uid) : false);

    const toggleLike = async () => {
        if (!currentUser) {
            console.error("No user logged in!");
            return;
        }

        const postRef = doc(db, "posts", id);
        
        // Check current like status and update accordingly
        if (isLiked) {
            try {
                await updateDoc(postRef, {
                    likedBy: arrayRemove(currentUser.uid)
                });
                setLikes(likes - 1);
                setIsLiked(false);
            } catch (error) {
                console.error("Error removing like: ", error);
            }
        } else {
            try {
                await updateDoc(postRef, {
                    likedBy: arrayUnion(currentUser.uid)
                });
                setLikes(likes + 1);
                setIsLiked(true);
            } catch (error) {
                console.error("Error adding like: ", error);
            }
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
