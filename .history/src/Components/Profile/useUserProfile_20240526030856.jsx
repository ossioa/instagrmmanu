import { useState, useEffect, useCallback } from 'react';
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

export default useUserProfile;
