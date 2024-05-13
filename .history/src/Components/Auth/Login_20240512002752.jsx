import React, { useState } from 'react';
import { auth } from '../../config/firebase';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailLogin = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Logged in Successfully:', userCredential.user);
    } catch (error) {
      console.error('Error Logging in:', error);
    }
  };

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('Google Sign-In Success', result.user);
    } catch (error) {
      console.error('Google Sign-In Error', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleEmailLogin} className="flex flex-col p-6 space-y-4 bg-white shadow-md rounded-lg max-w-md w-full">
        <h2 className="text-xl font-semibold text-center mb-6">Login to Your Account</h2>
        <div className="flex items-center space-x-2">
          <span className="material-icons-outlined text-gray-500">email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="input input-bordered w-full"
            autoComplete="username"
          />
        </div>
        <div className="flex items-center space-x-2">
          <span className="material-icons-outlined text-gray-500">lock</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="input input-bordered w-full"
            autoComplete="current-password"
          />
        </div>
        <button type="submit" className="btn btn-primary w-full">Login</button>
        <button type="button" onClick={googleSignIn} className="btn btn-secondary w-full flex items-center justify-center">
          <span className="material-icons-outlined mr-2">login</span>
          Sign in with Google
        </button>
      </form>
    </div>
  );
};

export default Login;
