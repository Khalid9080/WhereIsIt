import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import axios from 'axios';
import { BsFillGrid3X3GapFill } from "react-icons/bs";
{/* <BsFillGrid3X3GapFill />  -- > 3 colum*/ }
import { HiMiniBars4 } from "react-icons/hi2";
import Heading from '../Components/Heading';
{/* <HiMiniBars4 />  -- > 4 colum */ }


const AllRecoverd_Items = () => {
    const [recoveredItems, setRecoveredItems] = useState([]); // State to hold recovered items data
    const [isGridView, setIsGridView] = useState(true); // State to toggle between grid and table view

    // Fetch recovered items from the server
    useEffect(() => {
        fetchRecoveredItems();
    }, []);

    const fetchRecoveredItems = async () => {
        try {
            const { data } = await axios.get('https://where-is-it-server-side-three.vercel.app/get-all-recovered-items'); // Adjust the endpoint as needed
            setRecoveredItems(data);
        } catch (error) {
            // console.log("Error fetching recovered items:", error);
        }
    };

    return (
        <div className="overflow-x-auto w-10/12 mx-auto my-10 signika-negative">
            <div className='space-y-4 '>
                {/* <h1 className='text-center text-5xl font-bold '>All Recovered Items</h1> */}
                <Heading title="All Recovered Items" />
                <p className='text-center'>At WhereItIs, we understand how frustrating it can be to lose something important. Our website brings together a community of people dedicated to helping each other recover lost items. With our easy-to-use interface, you can quickly find and report lost or found items in your area.</p>
            </div>

            {/* Layout Toggle Button */}
            <div className="flex justify-end mb-4">
                <button
                    className="px-4 py-2 bg-gray-900 text-white rounded shadow hover:bg-black-900"
                    onClick={() => setIsGridView(!isGridView)}
                >
                    {isGridView ? <HiMiniBars4 /> : <BsFillGrid3X3GapFill />}
                </button>
            </div>

            {/* Display Data */}
            {recoveredItems.length === 0 ? (
                <div className="text-center text-lg font-semibold text-gray-500">No Recovered Items Available!</div>
            ) : (
                isGridView ? (
                    //Grid View
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-base-100 shadow-xl">
                        {recoveredItems.map((item) => (
                            <div key={item._id} className="p-4 border  shadow hover:shadow-lg rounded-xl">
                                <p><strong>User Email:</strong> {item.recoveredBy}</p>
                                <p><strong>Location:</strong> {item.recoveredLocation}</p>
                                <p><strong>Date:</strong> {format(new Date(item.recoveredDate), 'P')}</p>
                            </div>
                        ))}
                    </div>


                    // <div className="card bg-base-100 border-1 shadow-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    //     {recoveredItems.map((item) => (
                    //         <div key={item._id} className="card-body ">
                    //             <p><strong>User Email:</strong> {item.recoveredBy}</p>
                    //             <p><strong>Location:</strong> {item.recoveredLocation}</p>
                    //             <p><strong>Date:</strong> {format(new Date(item.recoveredDate), 'P')}</p>

                    //         </div>
                    //     ))}
                    // </div>
                ) : (
                    // Table View
                    <table className="table-auto w-full border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2">User Email</th>
                                <th className="border border-gray-300 px-4 py-2">Recovered Location</th>
                                <th className="border border-gray-300 px-4 py-2">Recovered Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recoveredItems.map((item) => (
                                <tr key={item._id} className="hover:bg-gray-100">
                                    <td className="border border-gray-300 px-4 py-2">{item.recoveredBy}</td>
                                    <td className="border border-gray-300 px-4 py-2">{item.recoveredLocation}</td>
                                    <td className="border border-gray-300 px-4 py-2">{format(new Date(item.recoveredDate), 'P')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )
            )}
        </div>
    );
};

export default AllRecoverd_Items;
