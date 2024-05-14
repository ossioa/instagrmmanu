import React from 'react';
import CommentList from './CommentList';
import { FaComments } from 'react-icons/fa';

const CommentPopup = ({ postId, setShowComments }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full">
                <div className="flex justify-end">
    <button onClick={() => setShowComments(true)} className="text-blue-500 cursor-pointer border-spacing-2 font-bold">
        <FaComments className="inline-block mr-1"/> {/* Ajoutez l'icône ici */}
        View Comments
    </button>
    {showComments && <CommentPopup postId={id} setShowComments={setShowComments} />}
</div>
                <CommentList postId={postId} /> 
            </div>
        </div>
    );
};

export default CommentPopup;
