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
    <form onSubmit={handleEmailLogin}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Login</button>
      <button onClick={googleSignIn}>Sign in with Google</button>  {/* Bouton pour la connexion Google */}
    </form>
  );
};

export default Login;
