
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../Common/Loading';
import { AuthContext } from './AuthPorvider';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <Loading />;
    }

    // If the user is logged in, render children
    if (user && user?.email) {
        return children;
    }

    // If not logged in, navigate to login page and pass current location as state
    return <Navigate to={'/login'} state={location.pathname}  />;
};

export default PrivateRoute;


// import { useContext } from "react";
// import { Navigate, useLocation } from "react-router-dom";
// import Loading from "../Common/Loading";
// import { AuthContext } from "./AuthPorvider";



// const PrivateRoute = ({children}) => {
//     const {user,loading} = useContext(AuthContext);
//     const location=useLocation();
//     if(loading){
//         return <Loading></Loading>
//     }
//     if(user && user?.email){
//         return children;
//     }
//     return <Navigate  to={'/login'} state={location.pathname} ></Navigate>
// };

// export default PrivateRoute;
