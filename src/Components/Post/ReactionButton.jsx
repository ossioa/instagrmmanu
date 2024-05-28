import React, { useState } from 'react';
import { db } from '../../config/firebase';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';

const reactionEmojis = {
    like: '👍',
    love: '❤️',
    laugh: '😂',
    sad: '😢',
    angry: '😠'
};

const ReactionButton = ({ postId, reactions, currentUserReaction, setCurrentUserReaction }) => {
    const [showReactions, setShowReactions] = useState(false);
    const { currentUser } = useAuth();

    const toggleReaction = async (reaction) => {
        if (!currentUser) {
            return;
        }

        const postRef = doc(db, "posts", postId);
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
        }
        setShowReactions(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setShowReactions(!showReactions)}
                className={`p-2 ${currentUserReaction ? 'text-blue-500' : 'text-gray-500'}`}
            >
                {currentUserReaction ? reactionEmojis[currentUserReaction] : '👍'} React
            </button>
            {showReactions && (
                <div className="absolute z-10 flex space-x-2 bg-white p-2 border border-gray-300 rounded-lg shadow-lg">
                    {Object.keys(reactionEmojis).map(reaction => (
                        <button
                            key={reaction}
                            onClick={() => toggleReaction(reaction)}
                            className="p-2"
                        >
                            {reactionEmojis[reaction]}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ReactionButton;
