import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Auth/AuthPorvider';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Ensure correct import
import DatePicker from 'react-datepicker';  // Import DatePicker
import 'react-datepicker/dist/react-datepicker.css'; // Import DatePicker CSS
import Heading from '../Components/Heading';

const Post_Details = () => {
    const { user } = useContext(AuthContext);
    const [postDetails, setPostDetails] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null); // New state for selected item
    const [recoveredLocation, setRecoveredLocation] = useState(''); // State for recovered location
    const [recoveredDate, setRecoveredDate] = useState(null); // State for recovered date
    const navigate = useNavigate();

    // Fetch items when component mounts
    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const { data } = await axios.get('https://where-is-it-server-side-three.vercel.app/Get-All-lostFound');
            setPostDetails(data);
            console.log('Fetched Post Details:', data); // Log fetched data for debugging
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    // Fetch items from backend based on the user ID
    // const fetchItems = async () => {
    //     try {
    //         const { data } = await axios.get(`https://where-is-it-server-side-three.vercel.app/Get-All-lostFound/${user?.id}`);
    //         setPostDetails(data);
    //         console.log('Fetched Post Details:', data); // Log fetched data for debugging
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     }
    // };



    // Handle claim button click (when item is "Found")
    const handleClaim = (item) => {
        // console.log("Claimed", item);
        setSelectedItem(item); // Set the selected item
        document.getElementById('my_modal_4').showModal(); // Open modal
    };

    // Handle found button click (when item is "Lost")
    const handleFound = (item) => {
        // console.log("Marked as Found", item);
        setSelectedItem(item); // Set the selected item
        document.getElementById('my_modal_4').showModal(); // Open modal
    };

    const handleSubmit = async () => {
       
        if (!recoveredLocation || !recoveredDate) {
           toast.error("Please provide both location and date.");
            return;
        }

        // Send the recovered information to the backend to store it in the RecoveredItems collection and update the status
        try {
            const response = await axios.put(`https://where-is-it-server-side-three.vercel.app/mark-as-recovered/${selectedItem._id}`, {
                recoveredLocation,
                recoveredDate,
                recoveredBy: user?.email, // Assuming you're passing the user's email as the one who marks it recovered
            });
            toast.success("Item marked as recovered successfully!");
            console.log(response.data);
            

            // Close the modal after submission
            document.getElementById('my_modal_4').close();

            // Optionally, refresh the list of items if needed
            fetchItems(); // This will re-fetch the data
        } catch (error) {
            toast.error("Already marking item as recovered.");
            // console.error("Error marking item as recovered:", error);
            
        }
    };

    return (
        <div className='my-14'>
             <ToastContainer />
            <div className='my-14 space-y-4 '>
                {/* <h1 className='text-5xl text-center font-bold'>Details of Your Post</h1> */}
                <Heading title="Details of Your Post" />
                <p className='text-center'>We provide a seamless experience for users to report and recover their belongings. Whether it's something you’ve lost or something you've found, we make the process of reconnecting with your items as quick and simple as possible.</p>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>

                <button className="hidden btn" onClick={() => document.getElementById('my_modal_4').showModal()}>
                    Open modal
                </button>

                <dialog id="my_modal_4" className="modal">
                    <div className="modal-box w-11/12 max-w-5xl">
                        <h3 className="font-bold text-xl py-3">Personal Information</h3>
                        {selectedItem && (
                            <>
                                <img
                                    src={selectedItem.photo}
                                    alt="Item"
                                    className="rounded-xl mb-4"
                                    style={{ width: '100%', height: 'auto' }} // Set the image to full width
                                />
                                <p><strong>Name:</strong> {selectedItem.name}</p>
                                <p><strong>Email:</strong> {selectedItem.email}</p>
                            </>
                        )}
                        <h1 className="py-4 font-bold text-xl">Recovered Information</h1>

                        <div className="form-control flex-1 mb-4">
                            <label className="label">
                                <span className="label-text">Recovered Location</span>
                            </label>
                            <input
                                type="text"
                                name="recoveredLocation"
                                placeholder="Enter recovered location"
                                className="input input-bordered"
                                value={recoveredLocation}
                                onChange={(e) => setRecoveredLocation(e.target.value)} // Handle change
                                required
                            />
                        </div>

                        <div className="form-control flex-1 mb-4">
                            <label className="label">
                                <span className="label-text">Recovered Date</span>
                            </label>
                            <DatePicker
                                selected={recoveredDate} // Selected date
                                onChange={(date) => setRecoveredDate(date)} // Update date
                                dateFormat="P" // Date format (you can change this to any preferred format)
                                className="input input-bordered"
                                placeholderText="Select recovered date"
                                required
                            />
                        </div>

                        <div className="modal-action">
                            <form method="dialog">
                                <div className='space-x-3'>
                                    <button className="btn" onClick={handleSubmit}>Submit</button>
                                    <button className="btn">Close</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </dialog>

                {postDetails.length === 0 ? (
                    <p>No posts found.</p>
                ) : (
                    postDetails.map((item) => (
                        <div key={item._id} className="card bg-base-100 shadow-xl rounded-xl overflow-hidden">
                            <figure className="relative">
                                <img
                                    src={item.photo}
                                    alt="Item"
                                    className="w-full h-48 object-cover rounded-t-xl"
                                />
                                <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-lg">
                                    <p className="font-semibold">{item.category}</p>
                                </div>
                            </figure>
                            <div className="card-body p-6 flex flex-col justify-between">
                                <h2 className="card-title text-2xl font-semibold text-gray-800 mb-2">{item.title}</h2>
                                <div className="flex items-center gap-1">
                                    <h3>Name:</h3><h3 className="text-lg text-gray-600">{item.name}</h3>
                                </div>
                                <div className="flex items-center gap-1">
                                    <h4>Email: </h4><h4 className="text-sm text-gray-500">{item.email}</h4>
                                </div>
                                <div className="flex items-center gap-1">
                                    <h4>Post Type: </h4><h4 className="text-sm text-gray-500 italic">{item.type}</h4>
                                </div>
                                <div className="flex items-center gap-1">
                                    <h4>Location: </h4><h4 className="text-sm text-gray-500">{item.location}</h4>
                                </div>
                                <div className="flex items-center gap-1">
                                    <h4>Date of Lost: </h4><h4 className="text-sm text-gray-500">{format(new Date(item.date), 'P')}</h4>
                                </div>
                                <div className="flex items-center gap-1">
                                    <h4>Description: </h4><h4 className="text-sm text-gray-600">{item.describe}</h4>
                                </div>

                                <div className="card-actions mt-4 flex justify-between items-center">
                                    {item.type === "found" ? (
                                        <button onClick={() => handleClaim(item)} className="btn btn-primary text-white bg-green-600 hover:bg-green-800 transition duration-200 border-0 px-4 py-2 rounded-lg">
                                            This is Mine!
                                        </button>
                                    ) : item.type === "lost" ? (
                                        <button onClick={() => handleFound(item)} className="btn btn-primary text-white bg-red-600 hover:bg-red-800 transition duration-200 border-0 px-4 py-2 rounded-lg">
                                            Found This!
                                        </button>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Post_Details;
