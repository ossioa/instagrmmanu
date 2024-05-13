import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Adjust the path as necessary
import { auth } from '../../config/firebase'; // Ensure this is correctly imported
import { signOut } from 'firebase/auth';

const Nav = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleSignOut = async () => {
    try {
      await signOut(auth);  // Firebase sign out
      navigate('/login');   // Redirect to login after sign out
    } catch (error) {
      console.error('Sign out failed', error);
    }
  };




  import React from 'react';
  
  
  


export default Navbar;



