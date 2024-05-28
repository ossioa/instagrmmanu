import React, { useState, useEffect } from 'react';
import { db } from '../../config/firebase';
import { doc, updateDoc, arrayUnion, arrayRemove, deleteDoc, addDoc, collection, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';
import { FaComments } from 'react-icons/fa';
import AvatarDisplay from '../Profile/AvatarDisplay';
import CommentPopup from '../Comments/CommentPopup'; 
import { FaTrashAlt } from 'react-icons/fa';

const reactionEmojis = {
    like: '👍',
    love: '❤️',
    laugh: '😂',
    sad: '😢',
    angry: '😠'
};

const Post = ({ id, photoURL, caption, reactions = {}, userId, timestamp }) => {
    const { currentUser } = useAuth();
    const [currentUserReaction, setCurrentUserReaction] = useState(null);
    const [commentsCount, setCommentsCount] = useState(0); 
    const [showComments, setShowComments] = useState(false); 
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (currentUser) {
            for (const [reaction, users] of Object.entries(reactions)) {
                if (users.includes(currentUser.uid)) {
                    setCurrentUserReaction(reaction);
                    break;
                }
            }
        }
    }, [currentUser, reactions]);

    useEffect(() => {
        const postRef = doc(db, "posts", id);
        const commentsRef = collection(postRef, "comments");

        const unsubscribe = onSnapshot(commentsRef, (snapshot) => {
            setCommentsCount(snapshot.size); 
        });

        return () => unsubscribe();
    }, [id]);

    const toggleReaction = async (reaction) => {
        if (!currentUser) {
            setError("You must be logged in to react to posts.");
            return;
        }

        const postRef = doc(db, "posts", id);
        try {
            if (currentUserReaction === reaction) {
                await updateDoc(postRef, { [`reactions.${reaction}`]: arrayRemove(currentUser.uid) });
                setCurrentUserReaction(null);
            } else {
                if (currentUserReaction) {
                    await updateDoc(postRef, { [`reactions.${currentUserReaction}`]: arrayRemove(currentUser.uid) });
                }
                await updateDoc(postRef, { [`reactions.${reaction}`]: arrayUnion(currentUser.uid) });
                setCurrentUserReaction(reaction);
            }
        } catch (error) {
            console.error("Error updating reaction: ", error);
            setError("Failed to update reaction.");
        }
    };

    const deletePost = async () => {
        if (!currentUser || currentUser.uid !== userId) {
            setError("You must be logged in and be the post owner to delete posts.");
            return;
        }

        const postRef = doc(db, "posts", id);
        try {
            await deleteDoc(postRef);
            alert("Post deleted successfully.");
        } catch (error) {
            console.error("Error deleting post: ", error);
            setError("Failed to delete post.");
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!currentUser) {
            setError("Please log in to comment.");
            return;
        }
        if (comment.trim() === '') {
            setError("Comment cannot be empty.");
            return;
        }
        try {
            const postRef = doc(db, "posts", id);
            const commentData = {
                text: comment,
                userId: currentUser.uid,
                timestamp: new Date(),
            };
            await addDoc(collection(postRef, "comments"), commentData);
            setComment('');
        } catch (error) {
            console.error("Error adding comment: ", error);
            setError("Failed to add comment.");
        }
    };

    const totalReactions = Object.values(reactions).reduce((sum, users) => sum + users.length, 0);

    return (
        <div className="border rounded-lg p-4 shadow-lg mb-4 bg-gray-100">
            <AvatarDisplay userId={userId} />
            <img src={photoURL} alt="Post" className="w-full h-auto mt-3" />
            <div className="py-2 ">
                <p>{caption}</p>
                <p className="text-gray-500 text-sm mt-1">Posted at {timestamp.toDateString()} {timestamp.toLocaleTimeString()}</p>
                <div className="flex items-center justify-between mt-2">
                    {Object.keys(reactionEmojis).map(reaction => (
                        <button
                            key={reaction}
                            onClick={() => toggleReaction(reaction)}
                            className={`p-2 ${currentUserReaction === reaction ? 'text-blue-500' : 'text-gray-500'}`}
                        >
                            {reactionEmojis[reaction]} {reaction.charAt(0).toUpperCase() + reaction.slice(1)}
                        </button>
                    ))}
                    {currentUser && currentUser.uid === userId && (
                        <button onClick={deletePost} className="p-2 text-red-600 animate-bounce ease-in-out duration-300 relative">
                            <span className="text-1xl text-red-600" title="Delete Post"> 
                                <FaTrashAlt className="text-red-600" />
                             </span>
                        </button>
                    )}
                    <span>{totalReactions} Reactions</span>
                </div>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                <div>
                    <form onSubmit={handleCommentSubmit} className="mt-2">
                        <input
                            type="text"
                            placeholder="Add a comment..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="input input-bordered w-full"
                        />
                        <button type="submit" className="btn btn-sm mt-2 shadow bg-blue-500 text-slate-100 hover:text-black font-bold">Comment</button>
                    </form>
                </div>
                <div className="flex justify-end">
                    <button onClick={() => setShowComments(true)} className="text-blue-500 cursor-pointer border-spacing-2 font-bold flex gap-2 items-center">
                    {commentsCount} View Comments <FaComments className="inline-block text-blue-900"/> 
                    </button>
                    {showComments && <CommentPopup postId={id} setShowComments={setShowComments} />}
                </div>
            </div>
        </div>
    );
};

export default Post;
