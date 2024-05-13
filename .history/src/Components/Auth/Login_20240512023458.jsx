import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { AiOutlineMail, AiOutlineLock, AiOutlineGoogle } from 'react-icons/ai';
import { FiLogIn, FiUserPlus } from 'react-icons/fi';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true); // true pour connexion, false pour inscription
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleAuth = async (event) => {
    event.preventDefault();
    try {
      const userCredential = isLogin
        ? await signInWithEmailAndPassword(auth, email, password)
        : await createUserWithEmailAndPassword(auth, email, password);
      console.log(`${isLogin ? 'Logged in' : 'Signed up'} Successfully:`, userCredential.user);
      navigate('/');
    } catch (error) {
      console.error(`${isLogin ? 'Error Logging in' : 'Error Signing up'}:`, error);
    }
  };

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('Google Sign-In Success', result.user);
      navigate('/');
    } catch (error) {
      console.error('Google Sign-In Error', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleAuth} className="flex flex-col p-6 space-y-4 bg-white shadow-md rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center mb-6 text-blue-500">{isLogin ? 'Connectez-vous à votre compte' : "Créez un compte"}</h2>
        <div className="flex items-center space-x-2">
          <AiOutlineMail className="text-gray-500" />
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
          <AiOutlineLock className="text-gray-500" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            className="input input-bordered w-full"
            autoComplete="current-password"
          />
        </div>
        <button type="submit" className="btn btn-primary w-full flex items-center justify-center">
          {isLogin ? <FiLogIn className="mr-2" /> : <FiUserPlus className="mr-2" />}
          {isLogin ? 'Se connecter' : 'S’inscrire'}
        </button>
        <button type="button" onClick={googleSignIn} className="btn btn-secondary w-full flex items-center justify-center">
          <AiOutlineGoogle className="mr-2" />
          {isLogin ? 'Se connecter avec Google' : 'S’inscrire avec Google'}
        </button>
        <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-blue-500 hover:text-blue-600">
          {isLogin ? 'Pas de compte ? S’inscrire' : 'Déjà un compte ? Se connecter'}
        </button>
      </form>
    </div>
  );
};

export default Login;
