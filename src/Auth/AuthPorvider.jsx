import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import auth from '../Firebase/firebase.init';
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createNewUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // const createNewUser = async (email, password, displayName) => {
    //     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    //     const user = userCredential.user;
        
    //     // Set displayName
    //     if (displayName) {
    //         await user.updateProfile({
    //             displayName: displayName,
                
    //         });
    //         console.log(displayName);
    //     }
    // };


    

    

    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    //         setUser(currentUser);
    //         setLoading(false); // Once the auth state is updated, set loading to false
    //     });
    //     return () => {
    //         unsubscribe();
    //     };
    // }, []);


 
   useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth,  async currentUser => {
            if(currentUser?.email){
                setUser(currentUser);
            const {data} = await axios.post('https://where-is-it-server-side-three.vercel.app/jwt',{email:currentUser.email},
                {withCredentials:true}
            );
         
            
            } 
            else{
                setUser(currentUser);
                const {data} = await axios.get('https://where-is-it-server-side-three.vercel.app/logout',{withCredentials:true});
            }
            setLoading(false);
        });
        return () => {
            unsubscribe();
        };
    }, []);


    

    const userLogin = (email, password) => {
        setLoading(true); // Set loading before trying to log in
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logOut = () => {
        setLoading(true); // Set loading before logging out
        return signOut(auth); // After logging out, loading will be false once the auth state updates
    };

    const authInfo = {
        user,
        setUser,
        createNewUser,
        logOut,
        userLogin,
        loading,
    };

    return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
