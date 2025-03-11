import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../Auth/AuthPorvider";
import Loading from "../Common/Loading";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
import Heading from "../Components/Heading";

const Add_Items = () => {

    const { user, loading } = useContext(AuthContext); // Grab loading state as well
    const [startDate, setStartDate] = useState(new Date());

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
        const formData = { name, email, title, type, category, location, date, photo, describe }
        // console.log(formData);

        try {
            const { data } = await axios.post('https://where-is-it-server-side-three.vercel.app/add-LostFound', formData);
            // console.log(data);
            toast.success("Post added successfully");
            form.reset();
        }
        catch (err) {
            // console.log(err);
            toast.error(err.message);

        }

    }

    if (loading) {
        return <Loading />; // Show loading if auth state is still being checked
    }

    if (!user) {
        return
    }



    return (
        <div>
            <Toaster />
            <div className='lg:w-3/4 mx-auto my-10'>
                <div className="text-center">
                    {/* <h1 className="text-5xl font-bold">Add Your Lost and Found Items</h1> */}
                    <Heading title="Add Your Lost and Found Items" />
                    <p className="py-6">
                        Please fill out the form below to add details about your lost or found item. Make sure to provide accurate information to help others identify and return the item to its rightful owner.
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
                                    <input  type="text" name='name' placeholder="Add your name" className="input input-bordered" required />
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
                                    <input type="text" name='title' placeholder="Give a title" className="input input-bordered" required />
                                </div>

                                <label className="form-control flex-1">
                                    <div className="label">
                                        <span className="label-text">Post Type</span>
                                    </div>
                                    <select name="type" className="select select-bordered" defaultValue="Pick one">
                                        <option value="Pick one" disabled>Pick one</option>
                                        <option value="lost">Lost</option>
                                        <option value="found">Found</option>
                                    </select>
                                </label>
                                <label className="form-control flex-1">
                                    <div className="label">
                                        <span className="label-text">Category</span>
                                    </div>
                                    <select name="category" className="select select-bordered" defaultValue="Pick one">
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
                                        <input type="text" name='image' placeholder="Add img url" className="input input-bordered" required />

                                    </label>

                                </div>
                                <div className="form-control flex-1">
                                    <label className="label">
                                        <span className="label-text">Date of Lost</span>
                                    </label>
                                    {/* <input  type="date" name='deadline' placeholder="Add a Deadline" className="input input-bordered" /> */}
                                    <DatePicker className="input input-bordered w-full" selected={startDate} onChange={(date) => setStartDate(date)} />
                                </div>
                            </div>



                            <div className="form-control mb-3">

                                <div className="label">
                                    <span className="label-text">Location where the item was lost</span>

                                </div>
                                <textarea name="location" className="textarea textarea-bordered h-24" placeholder="Location"></textarea>

                            </div>

                            <label className="form-control">
                                <div className="label">
                                    <span className="label-text">Descibe about your Item</span>

                                </div>
                                <textarea name="describe" className="textarea textarea-bordered h-24" placeholder="Describe"></textarea>

                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button value="Add post" className="btn btn-primary">Add Post</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Add_Items;