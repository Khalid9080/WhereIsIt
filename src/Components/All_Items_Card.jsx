import axios from 'axios';
import React from 'react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const All_Items_Card = ({ item, isHomePage }) => {
    const { name, email, title, type, category, location, date, photo, describe } = item || {};
    const navigate = useNavigate();

    const handleClick = () => {
        // Navigate to /postDetails and pass the current item
        navigate('/postDetails', { state: { item } });
    };

    const handleSeeMoreClick = () => {
        // Navigate to Lost_and_Found page
        navigate('/lost_and_found');
    };

    return (
         



        <div className="card bg-base-100 shadow-xl rounded-xl overflow-hidden">
            <figure className="relative">
                <img
                    src={photo}
                    alt="Item"
                    className="w-full h-48 object-cover rounded-t-xl"
                />
                <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-lg">
                    <p className="font-semibold">{category}</p>
                </div>
            </figure>
            <div className="card-body p-6 flex flex-col justify-between">
                <h2 className="card-title text-2xl font-semibold text-gray-800 mb-2">{title}</h2>
                <div className='flex items-center gap-1'><h3>Name:</h3><h3 className="text-lg text-gray-600">{name}</h3></div>
                <div className='flex items-center gap-1'><h4>Email: </h4><h4 className="text-sm text-gray-500">{email}</h4></div>
                <div className='flex items-center gap-1'><h4>Category: </h4><h4 className="text-sm text-gray-500">{category}</h4></div>
                <div className='flex items-center gap-1'><h4>Post Type: </h4><h4 className="text-sm text-gray-500 italic">{type}</h4></div>
                <div className='flex items-center gap-1'><h4>Location: </h4><h4 className="text-sm text-gray-500 ">{location}</h4></div>
                <div className='flex items-center gap-1'><h4>Date of Lost: </h4><h4 className="text-sm text-gray-500">{format(new Date(date), 'P')}</h4></div>
                <div className='flex items-center gap-1'><h4>Description: </h4><h4 className="text-sm text-gray-600 ">{describe}</h4></div>
                <div className="card-actions mt-4 flex justify-between items-center">
                    <button 
                        onClick={handleClick} 
                        className="btn btn-primary text-white bg-blue-600 hover:bg-blue-700 transition duration-200 border-0 px-4 py-2 rounded-lg">
                        View Details
                    </button>
                    {isHomePage && (
                        <button 
                            onClick={handleSeeMoreClick} 
                            className="btn btn-secondary text-white bg-gray-600 hover:bg-gray-700 transition duration-200 px-4 py-2 border-0 rounded-lg ml-4">
                            See More
                        </button>
                    )}
                </div>
            </div>
        </div>



    );
};

export default All_Items_Card;
