import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Common/Navbar';
import Footer from '../Common/Footer';

const Main_Layout = () => {
    return (
        <div className='signika'>
            <div className='bg-purple-200 p-5 signika'>
                <Navbar></Navbar>
            </div>
            
            <div className="container mx-auto w-full signika">
                <Outlet />
            </div>
            <div className='min-h-[calc(100vh-550px)]'></div>
            <div className='signika'><Footer></Footer></div>
            
        </div>
    );
};

export default Main_Layout;