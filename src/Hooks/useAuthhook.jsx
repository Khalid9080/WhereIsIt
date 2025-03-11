import React, { useContext } from 'react';
import { AuthContext } from '../Auth/AuthPorvider';

const useAuthhook = () => {
    const context = useContext(AuthContext);
    return context;
};

export default useAuthhook;