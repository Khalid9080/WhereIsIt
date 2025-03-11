import React, { useContext, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { GrUpdate } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";
import { AuthContext } from '../Auth/AuthPorvider';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import Heading from '../Components/Heading';

const My_Items = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [items, setItems] = useState([]); // State to hold the items data

    // Fetch items data from the server
    useEffect(() => {
        fetchItems();
    }, [user]);

    const fetchItems = async () => {
        try {
            const { data } =  await axiosSecure.get(`/Get-All-lostFound/${user?.email}`);
            
            setItems(data);
        } catch (error) {
            // console.log(error);
        }
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const { data } = await axios.delete(`https://where-is-it-server-side-three.vercel.app/delete-lostFound/${id}`);
                    // console.log(data);

                    // Refresh items after deletion
                    setItems(items.filter(item => item._id !== id));

                    // Show success message
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your item has been deleted.",
                        icon: "success"
                    });
                } catch (err) {
                    // console.log(err);
                    // Show error message
                    Swal.fire({
                        title: "Error!",
                        text: "Something went wrong, please try again.",
                        icon: "error"
                    });
                }
            }
        });
    };

    return (
        <div className="overflow-x-auto w-10/12 mx-auto ">
            <div className='text-center space-y-4 my-10'>
                {/* <h1 className=' text-5xl font-bold '>My Lost and Found Items</h1> */}
                <Heading title="My Lost and Found Items" />
                <p >WhereItIs is a platform designed to help you easily find lost items and reconnect with your belongings. Whether you've misplaced something small or lost a precious item, our goal is to make the process of finding what matters to you simpler and more effective.</p>
            </div>
            

            {/* Check if there are no items */}
            {items.length === 0 ? (
                <div className="text-center text-lg font-semibold text-gray-500">No Data Inserted!</div>
            ) : (
                <table className="table-auto w-full border-collapse border border-gray-200">
                    {/* Table Head */}
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2">User Name</th>
                            <th className="border border-gray-300 px-4 py-2">User Email</th>
                            <th className="border border-gray-300 px-4 py-2">Title</th>
                            <th className="border border-gray-300 px-4 py-2">Type</th>
                            <th className="border border-gray-300 px-4 py-2">Category</th>
                            <th className="border border-gray-300 px-4 py-2">Location</th>
                            <th className="border border-gray-300 px-4 py-2">Date</th>
                            <th className="border border-gray-300 px-4 py-2">Description</th>
                            <th className="border border-gray-300 px-4 py-2">Update</th>
                            <th className="border border-gray-300 px-4 py-2">Delete</th>
                        </tr>
                    </thead>
                    {/* Table Body */}
                    <tbody>
                        {items.map((item) => (
                            <tr key={item._id} className="hover:bg-gray-100">
                                <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.email}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.title}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.type}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.category}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.location}</td>
                                <td className="border border-gray-300 px-4 py-2">{format(new Date(item.date), 'P')}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.describe}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <button title="Update">
                                        <Link to={`/updateItems/${item._id}`}>
                                            <GrUpdate className="text-blue-500  ml-5 text-2xl cursor-pointer" />
                                        </Link>
                                    </button>
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <button onClick={() => handleDelete(item._id)} title="Delete">
                                        <MdDeleteForever className="text-red-500  ml-4 text-3xl  cursor-pointer" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default My_Items;
