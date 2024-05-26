import React, { useState, useEffect, useCallback } from 'react';
import { FaUserEdit, FaBiohazard } from 'react-icons/fa';
import { MdUpdate } from 'react-icons/md';
import { db } from '../../config/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';

const useUserProfile = () => {
    const { currentUser } = useAuth();
    const [profile, setProfile] = useState({ username: '', bio: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchUserProfile = useCallback(async () => {
        if (currentUser) {
            try {
                const docRef = doc(db, "users", currentUser.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setProfile(docSnap.data());
                } else {
                    setError("No such document!");
                }
            } catch (error) {
                setError("Error fetching user profile: " + error.message);
            } finally {
                setLoading(false);
            }
        }
    }, [currentUser]);

    useEffect(() => {
        fetchUserProfile();
    }, [fetchUserProfile]);

    const updateUserProfile = async (username, bio) => {
        if (!currentUser) {
            setError("Please log in to update your profile.");
            return;
        }
        setLoading(true);
        setError('');
        try {
            const userRef = doc(db, "users", currentUser.uid);
            await updateDoc(userRef, { username, bio });
            setProfile({ username, bio });
            setLoading(false);
            return "Profile updated successfully.";
        } catch (error) {
            setLoading(false);
            setError("Failed to update profile: " + error.message);
            throw new Error("Failed to update profile.");
        }
    };

    return { profile, loading, error, updateUserProfile };
};

const EditProfile = () => {
    const { profile, loading, error, updateUserProfile } = useUserProfile();
    const [username, setUsername] = useState(profile.username);
    const [bio, setBio] = useState(profile.bio);
    const [success, setSuccess] = useState('');
    const [localError, setLocalError] = useState(''); // Correction ici

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess('');
        setLocalError(''); // Correction ici
        if (!username || !bio) {
            setLocalError("Please fill all the fields."); // Correction ici
            return;
        }
        try {
            const successMessage = await updateUserProfile(username, bio);
            setSuccess(successMessage);
        } catch (error) {
            setLocalError(error.message); // Correction ici
        }
    };

    if (loading) {
        return <div>Loading...</div>;
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
                    disabled={loading}
                >
                    <MdUpdate className="mr-2"/>
                    {loading ? 'Updating...' : 'Update Profile'}
                </button>
                {(error || localError) && <p className="text-red-500 text-center mt-2">{error || localError}</p>}
                {success && <p className="text-green-500 text-center mt-2">{success}</p>}
            </form>
        </div>
    );
};

export default EditProfile;
