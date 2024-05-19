import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { AiOutlineMail, AiOutlineLock, AiOutlineGoogle, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FiLogIn, FiUserPlus } from 'react-icons/fi';
import { faUser, faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="flex justify-center items-center min-h-screen bg-gray-200" >
      <form onSubmit={handleAuth} className="flex flex-col p-6 space-y-4 bg-white shadow-lg rounded-xl max-w-md w-full">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
  {isLogin ? 
    <>
      <FontAwesomeIcon icon={faUser} /> LOG IN
    </> 
    : 
    <>
      <FontAwesomeIcon icon={faPencilAlt} /> REGISTER
    </>
  }
</h2>

        <div className="relative">
          <AiOutlineMail className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="input input-bordered w-full pl-10 pr-4 py-2"
            autoComplete="username"
          />
        </div>
        <div className="relative">
          <AiOutlineLock className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            className="input input-bordered w-full pl-10 pr-4 py-2"
            autoComplete="current-password"
          />
          <div onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer">
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </div>
        </div>
        <button type="submit" className="btn btn-primary w-full flex items-center justify-center gap-2 font-bold">
          {isLogin ? <FiLogIn className='text-xl' /> : <FiUserPlus className='text-xl' /> }
          {isLogin ? 'Sign-in': 'Sign-up'}
        </button>
        <button type="button" onClick={googleSignIn} className="btn btn-secondary w-full flex items-center justify-center gap-2 font-bold">
          <AiOutlineGoogle className='text-xl' />
          {isLogin ? 'Google Sign-in': 'Google Sign-up'}
        </button>
        <button type="button" onClick={() => setIsLogin(!isLogin)} className="mt-4 text-blue-600 hover:text-blue-700">
    {isLogin ? 
      <>
        <FontAwesomeIcon icon={faUserPlus} /> No account? Register here
      </> 
      : 
      <>
        <FontAwesomeIcon icon={faSignInAlt} /> Already an account? Log in here
      </>
    }
</button>

      </form>
    </div>
  );
};

export default Login;
