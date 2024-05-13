import React, { useState, useEffect } from 'react';
import { db } from '../../config/firebase';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';
import CommentList from '../Comments/CommentList';

const Post = ({ id, photoURL, caption, likedBy }) => {
    const [likes, setLikes] = useState(likedBy.length);
    const [isLiked, setIsLiked] = useState(false);
    const { currentUser } = useAuth();
    const [error, setError] = useState('');

    useEffect(() => {
        setIsLiked(likedBy.includes(currentUser?.uid));
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
            } else {
                await updateDoc(postRef, { likedBy: arrayUnion(currentUser.uid) });
                setLikes(prev => prev + 1);
            }
            setIsLiked(!isLiked);
        } catch (error) {
            console.error("Error updating like: ", error);
            setError("Failed to update like.");
        }
    };

    return (
        <div className="border rounded-lg p-4 shadow-lg mb-4 bg-gray-100">
            <img src={photoURL} alt="Post" className="w-full h-auto" />
            <div className="py-2">
                <p>{caption}</p>
                <div className="flex items-center justify-between mt-2">
                    <button onClick={toggleLike} disabled={!currentUser} className={`p-2 ${isLiked ? 'text-red-500' : 'text-gray-500'}`}>
                        {isLiked ? '❤️' : ''} Like
                    </button>
                    <span>{likes} Likes</span>
                </div>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
            <CommentList postId={id} /> {/* Ajoutez le CommentList ici */}
        </div>
    );
};

export default Post;
