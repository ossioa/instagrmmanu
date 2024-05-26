import React, { useState } from 'react';
import { FaUserEdit, FaBiohazard } from 'react-icons/fa';
import { MdUpdate } from 'react-icons/md';
import useUserProfile from '../../hooks/useUserProfile';

const EditProfile = () => {
    const { profile, loading, error, updateUserProfile } = useUserProfile();
    const [username, setUsername] = useState(profile.username);
    const [bio, setBio] = useState(profile.bio);
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess('');
        setError('');
        if (!username || !bio) {
            setError("Please fill all the fields.");
            return;
        }
        try {
            const successMessage = await updateUserProfile(username, bio);
            setSuccess(successMessage);
        } catch (error) {
            setError(error.message);
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
                {error && <p className="text-red-500 text-center mt-2">{error}</p>}
                {success && <p className="text-green-500 text-center mt-2">{success}</p>}
            </form>
        </div>
    );
};

export default EditProfile;
