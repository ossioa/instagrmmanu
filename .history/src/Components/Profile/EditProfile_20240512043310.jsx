import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext'; // Ensure path correctness
import { db } from '../../config/firebase'; // Ensure path correctness
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { FaUserEdit, FaBiohazard } from 'react-icons/fa';
import { MdUpdate } from 'react-icons/md';

const EditProfile = () => {
    const { currentUser } = useAuth();
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (currentUser) {
            const fetchUserProfile = async () => {
                const docRef = doc(db, "users", currentUser.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setUsername(docSnap.data().username);
                    setBio(docSnap.data().bio);
                } else {
                    console.log("No such document!");
                }
            };
            fetchUserProfile();
        }
    }, [currentUser]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !bio || !currentUser) {
            alert("Please fill all the fields and make sure you're logged in.");
            return;
        }
        setLoading(true);
        try {
            const userRef = doc(db, "users", currentUser.uid);
            await updateDoc(userRef, {
                username: username,
                bio: bio
            });
            alert("Profile Updated Successfully");
        } catch (error) {
            console.error("Error updating profile: ", error);
            alert("Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold text-center my-4">Edit Profile</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center space-x-2">
                    <FaUserEdit className="text-xl"/>
                    <input className="flex-1 p-2 border rounded" 
                           id="username" 
                           type="text" 
                           placeholder="Username" 
                           value={username} 
                           onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="flex items-center space-x-2">
                    <FaBiohazard className="text-xl"/>
                    <textarea className="flex-1 p-2 border rounded" 
                              id="bio" 
                              placeholder="Bio" 
                              value={bio} 
                              onChange={(e) => setBio(e.target.value)} />
                </div>
                <button className="flex items-center justify-center w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
                        type="submit" 
                        disabled={loading}>
                    <MdUpdate className="mr-2"/>
                    {loading ? 'Updating...' : 'Update Profile'}
                </button>
            </form>
        </div>
    );
};

export default EditProfile;
