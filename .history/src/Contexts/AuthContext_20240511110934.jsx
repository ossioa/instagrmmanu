import React, { useContext, createContext, useState, useEffect } from 'react';
import { auth } from '../config/firebase'; 
import { onAuthStateChanged } from 'firebase/auth';

// Create context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
        });

        return unsubscribe; // Cleanup subscription on unmount
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook to use the auth context
export const useAuth = () => useContext(AuthContext);
