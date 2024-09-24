import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from 'firebase/auth';
import { AiOutlineMail, AiOutlineLock, AiOutlineGoogle, AiOutlineEye, AiOutlineEyeInvisible, AiOutlineKey } from 'react-icons/ai';
import { FiLogIn, FiUserPlus } from 'react-icons/fi';
import { faUser, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);  // Toggle between login and registration mode
    const [email, setEmail] = useState('');  // Email input state
    const [password, setPassword] = useState('');  // Password input state
    const [showPassword, setShowPassword] = useState(false);  // Toggle password visibility
    const [forgotPassword, setForgotPassword] = useState(false);  // Toggle forgot password mode
    const [message, setMessage] = useState('');  // Display success or error messages
    const navigate = useNavigate();  // Navigation after login or sign up

    // Handle login or registration
    const handleAuth = async (event) => {
        event.preventDefault();
        try {
            const userCredential = isLogin
                ? await signInWithEmailAndPassword(auth, email, password)
                : await createUserWithEmailAndPassword(auth, email, password);
            console.log(`${isLogin ? 'Logged in' : 'Signed up'} Successfully:`, userCredential.user);
            navigate('/');  // Redirect after successful login/signup
        } catch (error) {
            console.error(`${isLogin ? 'Error Logging in' : 'Error Signing up'}:`, error);
            setMessage(`${isLogin ? 'Error Logging in' : 'Error Signing up'}: ${error.message}`);
        }
    };

    // Handle Google Sign-In
    const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            console.log('Google Sign-In Success', result.user);
            navigate('/');  // Redirect after successful Google sign-in
        } catch (error) {
            console.error('Google Sign-In Error', error);
            setMessage('Google Sign-In Error: ' + error.message);
        }
    };

    // Handle password reset
    const handlePasswordReset = async (event) => {
        event.preventDefault();
        try {
            await sendPasswordResetEmail(auth, email);
            setMessage('Password reset email sent successfully.');
        } catch (error) {
            console.error('Error sending password reset email:', error);
            setMessage('Error sending password reset email: ' + error.message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-200">
            <form onSubmit={forgotPassword ? handlePasswordReset : handleAuth} className="flex flex-col p-6 space-y-4 bg-white shadow-lg rounded-xl max-w-md w-full">
                <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
                    {forgotPassword ? (
                        <>
                            <AiOutlineKey className="mr-2" /> Reset Password
                        </>
                    ) : isLogin ? (
                        <>
                            <FontAwesomeIcon icon={faUser} /> LOG IN
                        </>
                    ) : (
                        <>
                            <FontAwesomeIcon icon={faPencilAlt} /> REGISTER
                        </>
                    )}
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

                {!forgotPassword && (
                    <div className="relative">
                        <AiOutlineLock className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="input input-bordered w-full pl-10 pr-4 py-2"
                            autoComplete="current-password"
                        />
                        <div onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer">
                            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                        </div>
                    </div>
                )}

                <button type="submit" className="btn btn-primary w-full flex items-center justify-center gap-2 font-bold">
                    {forgotPassword ? (
                        <>
                            <AiOutlineKey className="text-xl" /> Send Reset Link
                        </>
                    ) : isLogin ? (
                        <>
                            <FiLogIn className="text-xl" /> Sign-in
                        </>
                    ) : (
                        <>
                            <FiUserPlus className="text-xl" /> Sign-up
                        </>
                    )}
                </button>

                {!forgotPassword && (
                    <button type="button" onClick={googleSignIn} className="btn btn-secondary w-full flex items-center justify-center gap-2 font-bold">
                        <AiOutlineGoogle className="text-xl" />
                        {isLogin ? 'Google Sign-in' : 'Google Sign-up'}
                    </button>
                )}

                <button type="button" onClick={() => setForgotPassword(!forgotPassword)} className="mt-4 text-blue-600 hover:text-blue-700">
                    {forgotPassword ? 'Back to Login' : 'Forgot Password?'}
                </button>

                {!forgotPassword && (
                    <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-blue-600 hover:text-blue-700">
                        {isLogin ? 'No account? Register here' : 'Already an account? Log in here'}
                    </button>
                )}

                {message && <p className="text-red-500 text-center mt-2">{message}</p>}
            </form>
        </div>
    );
};

export default Login;
