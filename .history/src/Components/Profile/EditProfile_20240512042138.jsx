import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../config/firebase';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { FaUserEdit, FaBiohazard } from 'react-icons/fa';  // Icons for username and bio
import { MdUpdate } from 'react-icons/md';  // Icon for the update button

const EditProfile = () => {
    const { currentUser } = useAuth();
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (currentUser && currentUser.uid) {
            const docRef = doc(db, "users", currentUser.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setUsername(docSnap.data().username);
                setBio(docSnap.data().bio);
            } else {
                console.log("No such document!");
            }
        }
    }, [currentUser]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !bio) {
            alert("Please fill all the fields");
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
            <form onSubmit={handleSubmit}>
                <div className="mb-4 flex items-center">
                    <FaUserEdit className="text-lg mr-2"/>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                           id="username" 
                           type="text" 
                           placeholder="Username" 
                           value={username} 
                           onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="mb-4 flex items-center">
                    <FaBiohazard className="text-lg mr-2"/>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bio">
                        Bio
                    </label>
                    <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                              id="bio" 
                              placeholder="Bio" 
                              value={bio} 
                              onChange={(e) => setBio(e.target.value)} />
                </div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center" 
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
