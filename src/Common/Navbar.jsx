import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthPorvider';
import logo from '../assets/logo.png';
import User_Logo from '../assets/login-user.png';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Track dropdown state
    const [activeButton, setActiveButton] = useState(''); // Track active button (either 'login' or 'register')

    // Toggle dropdown
    const handleDropdownToggle = () => {
        setIsDropdownOpen((prev) => !prev); // Toggles the state of the dropdown
    };

    const link1 = (
        <div className="gap-2 flex lg:flex-row flex-col font-semibold">
            <li><NavLink to="/" className="text-base">Home</NavLink></li>
            <li><NavLink to="/lost_and_found" className="text-base">Lost & Found Items</NavLink></li>
        </div>
    );

    const link2 = (
        <div className="font-semibold space-y-2">
            <li><NavLink to="/addItems" className="text-base">Add Lost & Found Item</NavLink></li>
            <li><NavLink to="/postDetails" className="text-base">Post Details</NavLink></li>
            <li><NavLink to="/myItems" className="text-base">Manage My Items</NavLink></li>
            <li><NavLink to="/allRecoverdItems" className="text-base">All Recovered Item</NavLink></li>
            
            
        </div>
    );

    const link4 = (
        <div className="font-semibold space-y-2">
            <li><NavLink to="/login" className="text-base">Login</NavLink></li>
            <li><NavLink to="/register" className="text-base">Register</NavLink></li>
        </div>
    );



    const link3 = (
        <div className="flex gap-3  ">
            <div className="flex items-center gap-3 text-nowrap ">
                {/* User Profile Dropdown */}
                <div className="relative group">
                    <button
                        onClick={handleDropdownToggle}
                        className="btn btn-ghost btn-circle avatar"
                    >
                        <div className="w-10 rounded-full">
                            <img
                                src={user?.photoURL || User_Logo} // Default user logo if no user photo
                                alt="User"
                                referrerPolicy="no-referrer"
                                className="object-cover w-14 h-14 rounded-full"
                            />
                        </div>
                    </button>

                    {/* Tooltip */}
                    <div className="absolute bg-black text-white text-sm rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-max mt-2 left-1/2 transform -translate-x-1/2">
                        {user?.displayName || 'Guest'} {/* Fallback to 'Guest' if no displayName */}
                    </div>

                    {/* Dropdown menu */}
                    {isDropdownOpen && (
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 p-2 shadow absolute right-0 w-56 flex-col"
                        >
                            {link2}
                        </ul>
                    )}
                </div>
            </div>

            {/* Conditionally render Login/Logout buttons */}
            {!user ? (
                <div className="flex gap-3">
                    <NavLink to="/login" className="btn btn-primary text-base">
                        Login
                    </NavLink>
                    <NavLink to="/register" className="btn btn-secondary text-base">
                        Register
                    </NavLink>
                </div>
            ) : (
                <button onClick={logOut} className="btn btn-warning text-base ">
                    Logout
                </button>
            )}
        </div>
    );

    return (
        <div className="navbar  my-6 container mx-auto bg-purple-200">
            <div className="navbar-start">
                {/* <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] w-60 text-nowrap shadow"
                    >
                        {link1}
                        <div className="flex-col mt-3">{link2}</div>
                        <div className="flex-col mt-3">{link4}</div>
                        {user && (
                            <button onClick={logOut} className="btn mt-3 btn-warning text-base">
                                Logout
                            </button>
                        )}

                    </ul>
                </div> */}

                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 w-60 text-nowrap shadow"
                    >
                        {link1}
                        {user ? (
                            <>
                                <div className="flex-col mt-3">{link2}</div>
                                <button onClick={logOut} className="btn mt-3 btn-warning text-base">
                                    Logout
                                </button>
                            </>
                        ) : (
                            // <div className="flex flex-col space-x-2">
                            //     <NavLink to="/addItems" className="text-base"> Add Lost & Found Item</NavLink>
                            //     <NavLink to="/allRecoverdItems" className="text-base">All Recovered Item</NavLink>
                            //     <NavLink to="/myItems" className="text-base">Manage My Items</NavLink>
                            //     <NavLink to="/postDetails" className="text-base">Post Details</NavLink>
                            //     <NavLink to="/login" className=" text-base mb-2">Login</NavLink>
                            //     <NavLink to="/register" className=" text-base">Register</NavLink>
                            // </div>

                            <>
                                <div className="flex-col mt-3">{link2}</div>
                                <div className="flex-col mt-3">{link4}</div>
                                
                            </>
                           
                        )}
                    </ul>
                </div>

                <div className="flex items-center gap-3">
                    <div className="w-14">
                        <a className="text-xl">
                            <img className="object-cover w-full h-full" src={logo} alt="Logo" />
                        </a>
                    </div>
                    <h1 className="text-4xl font-bold text-center ">WhereIsIt</h1>
                </div>

            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-3 shadow bg-base-100 rounded-box w-full">
                    {link1}
                </ul>
            </div>

            <div className="navbar-end">
                <div className="navbar-center lg:flex">
                    <ul className="menu menu-horizontal px-3 py-3 shadow bg-base-100 hidden sm:block md:block lg:block rounded-box w-full">
                        {link3}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
