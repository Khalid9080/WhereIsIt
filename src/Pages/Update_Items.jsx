import React, { useContext, useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from '../Auth/AuthPorvider';
import { format } from 'date-fns';
import Loading from '../Common/Loading';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Heading from '../Components/Heading';


const Update_Items = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { user, loading } = useContext(AuthContext)
    const [startDate, setStartDate] = useState(new Date());
    const [items, setItems] = useState({}); // State to hold the items data

    // Fetch items data from the server
    useEffect(() => {
        fetchUpdatedItems();
    }, [id]);
    const fetchUpdatedItems = async () => {
        const { data } = await axios.get(`https://where-is-it-server-side-three.vercel.app/updateItems/${id}`);
        setItems(data);
        setStartDate(new Date(data.date))

    };



    const handleAddCampaign = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const title = form.title.value;
        const type = form.type.value;
        const category = form.category.value;
        const photo = form.image.value;
        const location = form.location.value;
        const describe = form.describe.value;
        const date = startDate;
        const UpdateformData = { name, email, title, type, category, location, date, photo, describe };

        try {
            const { data } = await axios.put(`https://where-is-it-server-side-three.vercel.app/update-Items/${id}`, UpdateformData);

            // Show success message
            Swal.fire({
                title: "Success!",
                text: "Data updated successfully.",
                icon: "success",
                confirmButtonText: "OK",
            }).then(() => {
                form.reset(); // Reset the form after successful submission
                navigate('/myItems'); // Navigate to the items page
            });
        } catch (err) {
            // Show error message
            Swal.fire({
                title: "Error!",
                text: err.message,
                icon: "error",
                confirmButtonText: "Try Again",
            });
        }
    };



    if (loading) {
        return <Loading />; // Show loading if auth state is still being checked
    }

    if (!user) {
        return
    }



    return (
        <div>
            <div className='lg:w-3/4 mx-auto my-10'>
                <div className="text-center p-10">
                    {/* <h1 className="text-5xl font-bold">Update Your Lost and Found Items</h1> */}
                    <Heading title="Update Your Lost and Found Items" />
                    <p className="py-6">
                        Please fill out the form below to add details about update your lost or found item. Make sure to provide accurate information to help others identify and return the item to its rightful owner.
                    </p>
                </div>
                <div className="card bg-base-100 w-full shrink-0 shadow-2xl">

                    <form onSubmit={handleAddCampaign} className="card-body">
                        <div>

                            <h1>Personal Information</h1>

                            <div className='flex flex-col gap-2'>
                                <div className="form-control flex-1">
                                    <label className="label">
                                        <span className="label-text">User Email</span>
                                    </label>
                                    <input defaultValue={user.email} disabled={true} type="email" name='email' placeholder="Add your email" className="input input-bordered" required />
                                </div>
                                <div className="form-control flex-1">
                                    <label className="label">
                                        <span className="label-text">User Name</span>
                                    </label>
                                    <input defaultValue={items.name} disabled={true} type="text" name='name' placeholder="Add your name" className="input input-bordered" required />
                                </div>
                            </div>
                        </div>


                        <div className="mt-6">
                            <h1>About the Lost and Found</h1>
                            {/* form first row */}
                            <div className='flex flex-col gap-3'>
                                <div className="form-control flex-1">
                                    <label className="label">
                                        <span className="label-text">Post Title</span>
                                    </label>
                                    <input defaultValue={items?.title} type="text" name='title' placeholder="Camapaign name" className="input input-bordered" required />
                                </div>
                                {
                                    items.type && (<label className="form-control flex-1">
                                        <div className="label">
                                            <span className="label-text">Post Type</span>
                                        </div>
                                        <select name="type" className="select select-bordered" defaultValue={items?.type}>
                                            <option value="Pick one" disabled>Pick one</option>
                                            <option value="lost">Lost</option>
                                            <option value="found">Found</option>
                                        </select>
                                    </label>)
                                }

                                <label className="form-control flex-1">
                                    <div className="label">
                                        <span className="label-text">Category</span>
                                    </div>
                                    <select name="category" className="select select-bordered" value={items?.category || ''} onChange={(e) => setItems({ ...items, category: e.target.value })}>
                                        <option value="Pick one" disabled>Pick one</option>
                                        <option value="Pets">Pets</option>
                                        <option value="Documents">Documents</option>
                                        <option value="Gadgets">Gadgets</option>
                                    </select>
                                </label>

                            </div>

                            {/* form third row */}
                            <div className='flex flex-col lg:flex-row my-3 gap-5 '>
                                <div className="form-control flex-1">
                                    <label className="form-control">

                                        <label className="label">
                                            <span className="label-text">Thumbnail Image</span>
                                        </label>
                                        <input defaultValue={items?.photo} type="text" name='image' placeholder="Add img url" className="input input-bordered" required />

                                    </label>

                                </div>
                                <div className="form-control flex-1">
                                    <label className="label">
                                        <span className="label-text">Date of Lost or Found</span>
                                    </label>
                                    {/* <input  type="date" name='deadline' placeholder="Add a Deadline" className="input input-bordered" /> */}
                                    <DatePicker className="input input-bordered w-full" selected={startDate} onChange={(date) => setStartDate(date)} />
                                </div>
                            </div>



                            <div className="form-control mb-3">

                                <div className="label">
                                    <span className="label-text">Location where the item was lost</span>

                                </div>
                                <textarea defaultValue={items?.location} name="location" className="textarea textarea-bordered h-24" placeholder="Location"></textarea>

                            </div>

                            <label className="form-control">
                                <div className="label">
                                    <span className="label-text">Descibe about your Item</span>

                                </div>
                                <textarea defaultValue={items?.describe} name="describe" className="textarea textarea-bordered h-24" placeholder="Describe"></textarea>

                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button value="Add post" className="btn btn-primary">Update Post</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Update_Items;