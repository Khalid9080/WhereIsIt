import React, { useEffect, useState } from 'react';
import All_Items_Card from '../Components/All_Items_Card';
import axios from 'axios';

const Lost_and_Found = () => {
    const [addAll, setaddAll] = useState([]);
    const [search, setSearch] = useState('');   

    useEffect(() => {
        
        const fetchItems = async () => {
            const { data } = await axios.get('https://where-is-it-server-side-three.vercel.app/search-items?search=' + search);
            setaddAll(data);
        }
        fetchItems();
    
    }, [search]);

    
    return (
        <div className='my-10'>
            <div className='text-center p-10 space-y-4'>
                <div className=' space-y-4 flex flex-col lg:flex-row items-center justify-end'>
                    <div><h1 className='font-bold text-5xl lg:mr-32 '>Lost and Found Your Item</h1></div>
                    <div className="join">
                        <div>
                            <div>
                                <input onBlur={e=>setSearch(e.target.value)} className="input input-bordered join-item w-72" placeholder="Search by Title" />
                            </div>
                        </div>

                        <div >
                            <button className="btn join-item btn-neutral">Search</button>
                        </div>
                    </div>
                </div>
                <p>WhereItIs is more than just a website; it’s a solution to the common problem of lost and found items. Our platform helps bridge the gap between people who have lost something and those who’ve found it. With just a few clicks, you can search for lost items or report something you’ve found, ensuring that valuable items are reunited with their owners.</p>
            </div>
           


            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
                {addAll.map((item) => <All_Items_Card key={item._id} item={item} />)}
            </div>
        </div>
    );
};

export default Lost_and_Found;
