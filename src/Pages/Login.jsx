import React, { useContext, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { AuthContext } from '../Auth/AuthPorvider';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import auth from '../Firebase/firebase.init';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState({});
    const { userLogin, setUser } = useContext(AuthContext);
    const provider = new GoogleAuthProvider();

    // Handle regular email/password login
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log({ email, password });

        if (!email || !password) {
            return;
        }

        userLogin(email, password)
            .then((result) => {
                const user = result.user;
                setUser(user);
                toast.success("Login successful");
                navigate(location?.state || '/');
            })
            .catch((error) => {
                const errorMessage = error.message;
                toast.error(errorMessage);
                // console.log("Error in userLogin:", errorMessage);
            });
    };

    // Handle Google Sign-In
    const handleGoogleSignIn = () => {


        signInWithPopup(auth, provider)
            .then((result) => {
                // console.log(result.user);
                toast.success("Google Sign in successful");
                navigate(location?.state || '/');
                // location?.state || 
            })
            .catch(error => {
                // console.log("Error in Google Sign in: ", error);
            });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);  // Toggle between true and false
    };

    return (
        <div>
            <div className="hero bg-base-200 min-h-screen rounded-xl my-16">
                <div className="card bg-purple-200  w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleSubmit} className="card-body">
                        <h1 className='text-center text-3xl font-bold leading-snug '>WhereIsIt<br />Login Page</h1>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" />
                        </div>

                        <div className="form-control relative">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="password"
                                className="input input-bordered"
                            />

                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className='btn btn-xs absolute right-3 top-12'>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>

                            {/* Displaying error message below the password field */}
                            {error.password && (
                                <label className="label text-sm text-red-500">
                                    {error.password}
                                </label>
                            )}

                            <label className="label">
                                <a className="text-sm link link-hover">Forgot password?</a>
                            </label>
                        </div>

                        <div className="form-control mt-5">
                            <button className="btn bg-black text-white hover:text-black">Login</button>

                            <button
                                onClick={handleGoogleSignIn}
                                className="flex mt-5 items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg shadow hover:shadow-md hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300"
                            >
                                <FcGoogle className="text-xl" />
                                <span className="text-sm font-medium text-gray-700">Sign in with Google</span>
                            </button>
                        </div>

                        <h1 className='mt-2'>
                            Do not have an account? Go to <NavLink to="/register"><span className='text-red-500'>Register.</span></NavLink>
                        </h1>
                    </form>
                </div>
            </div>

            {/* Toast container should be placed here for notifications */}
            <ToastContainer />
        </div>
    );
};

export default Login;
