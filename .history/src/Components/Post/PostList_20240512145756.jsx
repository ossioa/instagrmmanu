import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { db } from '../../config/firebase';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';

const Post = ({ id, photoURL, caption, likedBy }) => {
    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const { currentUser } = useAuth();

    useEffect(() => {
        // Ensure likedBy is always an array and currentUser is not undefined before processing
        if (Array.isArray(likedBy) && currentUser) {
            setIsLiked(likedBy.includes(currentUser.uid));
            setLikes(likedBy.length);
        }
    }, [likedBy, currentUser]);

    const toggleLike = async () => {
        if (!currentUser || !id) {
            console.error("No user logged in or post ID is undefined!");
            return;
        }

        const postRef = doc(db, "posts", id);
        const updatedLikedBy = isLiked ? arrayRemove(currentUser.uid) : arrayUnion(currentUser.uid);

        try {
            await updateDoc(postRef, { likedBy: updatedLikedBy });
            setIsLiked(!isLiked);
            setLikes(prev => isLiked ? prev - 1 : prev + 1);
        } catch (error) {
            console.error("Error updating like: ", error);
        }
    };

    return (
        <div className="border rounded-lg p-4 shadow-lg mb-4">
            <img src={photoURL || 'default-image.jpg'} alt="Post" className="w-full h-auto" />
            <div className="py-2">
                <p>{caption || 'No caption provided'}</p>
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

Post.propTypes = {
    id: PropTypes.string.isRequired,
    photoURL: PropTypes.string,
    caption: PropTypes.string,
    likedBy: PropTypes.arrayOf(PropTypes.string)
};

Post.defaultProps = {
    photoURL: 'default-image.jpg', // Provide a default image URL
    caption: 'No caption provided',
    likedBy: []
};

export default Post;
