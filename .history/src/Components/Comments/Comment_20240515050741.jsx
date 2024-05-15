// Composant Comment
import React from 'react';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useAuth } from '../../contexts/AuthContext';
import {AiOutlineDelete} from 'react-icons/ai';
import { format } from 'date-fns'; // Importez la bibliothèque date-fns pour formater la date et l'heure

const Comment = ({ commentId, text, userId, postId, timestamp, userName }) => { // Ajoutez timestamp et userName aux props
    const { currentUser } = useAuth();

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this comment?")) {
            try {
                await deleteDoc(doc(db, "posts", postId, "comments", commentId));
                alert("Comment deleted successfully.");
            } catch (error) {
                console.error("Error deleting comment: ", error);
                alert("Failed to delete comment.");
            }
        }
    };

    return (
        <div className="p-2 border-b border-gray-300 flex justify-between items-center">
            <p><strong>{userName}</strong>: {text}</p> {/* Affichez le nom de l'utilisateur en gras */}
            <p>{format(timestamp.toDate(), 'dd/MM/yyyy HH:mm')}</p> {/* Formatez et affichez la date et l'heure */}
            {currentUser && currentUser.uid === userId && (
                <button onClick={handleDelete} className=" hover:text-red-700 text-blue-600 p-2 rounded-full">
                    <AiOutlineDelete className="inline-block "/> 
                </button>
            )}
        </div>
    );
};

export default Comment;
