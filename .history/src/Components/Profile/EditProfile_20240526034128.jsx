import React, { useState, useEffect } from 'react';
import { FaUserEdit, FaBiohazard } from 'react-icons/fa';
import { MdUpdate } from 'react-icons/md';
import { db } from '../../config/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';
import



// Spinner Component
const Spinner = () => (
    <div className="flex justify-center items-center">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
    </div>
);

const EditProfile = () => {
    const { currentUser } = useAuth();
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (currentUser) {
            const fetchUserProfile = async () => {
                try {
                    const docRef = doc(db, "users", currentUser.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setUsername(docSnap.data().username);
                        setBio(docSnap.data().bio);
                    } else {
                        setError("No such document!");
                    }
                } catch (error) {
                    setError("Error fetching user profile: " + error.message);
                } finally {
                    setLoading(false);
                }
            };
            fetchUserProfile();
        } else {
            setLoading(false);
        }
    }, [currentUser]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess('');
        setError('');

        if (!username || !bio) {
            setError("Please fill all the fields.");
            return;
        }

        if (!currentUser) {
            setError("Please log in to update your profile.");
            return;
        }

        setUpdating(true);
        try {
            const userRef = doc(db, "users", currentUser.uid);
            await updateDoc(userRef, { username, bio });
            setSuccess("Profile updated successfully.");
        } catch (error) {
            setError("Failed to update profile: " + error.message);
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="container mx-auto px-4 py-4 bg-white shadow-md rounded-lg">
            <h1 className="text-xl font-semibold text-center mb-4">Edit Profile</h1>
            <form onSubmit={handleSubmit} className="space-y-3">
                <div className="flex items-center space-x-2">
                    <FaUserEdit className="text-xl"/>
                    <input
                        className="flex-grow p-2 border rounded"
                        id="username"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="flex items-center space-x-2">
                    <FaBiohazard className="text-xl"/>
                    <textarea
                        className="flex-grow p-2 border rounded"
                        id="bio"
                        placeholder="Bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                    />
                </div>
                <button
                    className="w-full flex justify-center items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out"
                    type="submit"
                    disabled={updating}
                >
                    <MdUpdate className="mr-2"/>
                    {updating ? 'Updating...' : 'Update Profile'}
                </button>
                {error && <p className="text-red-500 text-center mt-2">{error}</p>}
                {success && <p className="text-green-500 text-center mt-2">{success}</p>}
            </form>
        </div>
    );
};

export default EditProfile;
