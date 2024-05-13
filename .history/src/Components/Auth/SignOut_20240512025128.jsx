import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';
import { signOut } from 'firebase/auth';

const SignOut = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/login'); 
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <button onClick={handleSignOut} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
      Sign Out
    </button>
  );
};
<button onClick={handleSignOut} className="bg-blue-500 hover:bg-red-500 text-white font-bold p-2 rounded transform transition duration-500 ease-in-out hover:scale-110 flex justify-center items-center">
            <FaSignOutAlt className="mr-1 " />Sign Out
        </button>

export default SignOut;
