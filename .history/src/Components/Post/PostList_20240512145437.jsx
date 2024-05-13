import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { db } from '../../config/firebase';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';

const Post = ({ id, photoURL, caption, likedBy = [] }) => {
    const [likes, setLikes] = useState(likedBy.length);
    const [isLiked, setIsLiked] = useState(false);
    const { currentUser } = useAuth();

    useEffect(() => {
        // Update isLiked state based on the likedBy array
        setIsLiked(likedBy.includes(currentUser?.uid));
    }, [likedBy, currentUser]);

    const toggleLike = async () => {
        if (!currentUser) {
            console.error("No user logged in!");
            return;
        }

        const postRef = doc(db, "posts", id);
        try {
            if (isLiked) {
                await updateDoc(postRef, {
                    likedBy: arrayRemove(currentUser.uid)
                });
                setLikes(likes => likes - 1);
            } else {
                await updateDoc(postRef, {
                    likedBy: arrayUnion(currentUser.uid)
                });
                setLikes(likes => likes + 1);
            }
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

Post.propTypes = {
    id: PropTypes.string.isRequired,
    photoURL: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    likedBy: PropTypes.arrayOf(PropTypes.string)
};

Post.defaultProps = {
    likedBy: []
};

export default Post;
