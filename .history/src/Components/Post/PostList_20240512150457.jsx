import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { db } from '../../config/firebase';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';

const Post = ({
  id,
  photoURL = 'default-image.jpg',
  caption = 'No caption provided',
  likedBy = []
}) => {
    const [likes, setLikes] = useState(likedBy.length);
    const [isLiked, setIsLiked] = useState(false);
    const { currentUser } = useAuth();

    useEffect(() => {
        // Ensuring likedBy is always an array and currentUser is not undefined before processing
        setIsLiked(currentUser ? likedBy.includes(currentUser.uid) : false);
        setLikes(likedBy.length);
    }, [likedBy, currentUser]);

    const toggleLike = async () => {
        if (!currentUser || !id) {
            console.error("No user logged in or post ID is undefined!");
            return;
        }

        const postRef = doc(db, "posts", id);
        try {
            if (isLiked) {
                await updateDoc(postRef, {
                    likedBy: arrayRemove(currentUser.uid)
                });
                setLikes(prev => prev - 1);
            } else {
                await updateDoc(postRef, {
                    likedBy: arrayUnion(currentUser.uid)
                });
                setLikes(prev => prev + 1);
            }
            setIsLiked(!isLiked);
        } catch (error) {
            console.error("Error updating like: ", error);
        }
    };

    if (!id) {
        console.error("Error: Post ID is undefined");
        return <div>Post cannot be displayed because it lacks an ID.</div>;
    }

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
    photoURL: PropTypes.string,
    caption: PropTypes.string,
    likedBy: PropTypes.arrayOf(PropTypes.string)
};

export default Post;
