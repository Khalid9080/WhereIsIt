import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { AuthContext } from '../Auth/AuthPorvider';
import auth from '../Firebase/firebase.init';




const Register = () => {
    const {createNewUser,setUser}=useContext(AuthContext)
    const [showPassword, setShowPassword] = useState(false);
    // const {navigate}=useNavigate();
    const [error, setError] = useState({});
     const navigate = useNavigate();
     const provider = new GoogleAuthProvider();

     const handleGoogleSignIn = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // console.log(result);
                navigate('/');
            })
            .catch(error => {
                // console.log("Error in Google Sign in: ", error);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const name= form.get('name');
        const email= form.get('email');
        const photo= form.get('photo');
        const password= form.get('password');
        console.log({name,email,photo,password});

        setError({});

        // Name validation
        if (name.length < 5) {
            setError((prev) => ({ ...prev, name: "Name must be at least 5 characters long" }));
            return;
        }

        // Password validation
        const hasLowerCase = /(?=.*[a-z])/;
        const hasUpperCase = /(?=.*[A-Z])/;
        const hasDigitAndLength = /(?=.*\d).{6,}/;

        if (!hasLowerCase.test(password)) {
            setError((prev) => ({
                ...prev,
                password: "Password must contain at least one lowercase letter."
            }));
            toast.error("Password must contain at least one lowercase letter.");
            return;
        }
        

        if (!hasUpperCase.test(password)) {
            setError((prev) => ({
                ...prev,
                password: "Password must contain at least one uppercase letter."
            }));
            toast.error("Password must contain at least one uppercase letter.");
            return;
        }

        if (!hasDigitAndLength.test(password)) {
            setError((prev) => ({
                ...prev,
                password: "Password must be at least 6 characters long and contain at least one number."
            }));
            toast.error("Password must be at least 6 characters long and contain at least one number.")
            return;
        }

        createNewUser(name,email, password)
            .then((result) => {
                const user = result.user;
                setUser(user);
                toast.success("Sign up successful");
                navigate('/');
            })
            .catch((error) => {
                const errorMessage = error.message;
                toast.error(errorMessage);
                // console.log("Error in createNewUser:", errorMessage);
            });


          
    };
    
    return (
        <div>
            <div className="hero bg-base-200 min-h-screen rounded-xl my-16 ">
                <div className="card bg-purple-200 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleSubmit}  className="card-body">
                        <h1 className='text-center text-3xl font-bold leading-snug pb-3 font-sumana '> WhereIsIt<br />Register Page</h1>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-base">Name</span>
                            </label>
                            <input type="text" name="name" placeholder="name" className="input input-bordered" required />
                        </div>
                        {error.name && (
                            <label className="label text-sm text-red-500">
                                {error.name}
                            </label>
                        )} 

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-base">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-base">Photo-URL</span>
                            </label>
                            <input type="text" name="photo" placeholder="Photo-url" className="input input-bordered" required />
                        </div>

                        <div className="form-control relative">
                            <label className="label">
                                <span className="label-text text-base">Password</span>
                            </label>
                            <input
                             type={showPassword ? 'text' : 'password'} 
                             name="password" placeholder="password" className="input input-bordered" required />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className='btn btn-xs absolute right-3 bottom-3'
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {error.password && (
                            <label className="label text-sm text-red-500">
                                {error.password}
                            </label>
                        )} 

                        <div className="form-control mt-4">
                            <button className="btn bg-black text-white hover:text-black">Register</button>

                            <button
                                onClick={handleGoogleSignIn}
                                className="flex mt-3 items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg shadow hover:shadow-md hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300"
                            >
                                <FcGoogle className="text-xl" />
                                <span className="text-sm font-medium text-gray-700">Sign in with Google</span>
                            </button>
                        </div>

                        <h1 className='mt-2'>Already have an account? Go to <NavLink to="/login"><span className='text-red-500'>Login.</span></NavLink></h1>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Register;