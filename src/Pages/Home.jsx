import axios from 'axios';
import React, { useEffect, useState } from 'react';
import All_Items_Card from '../Components/All_Items_Card';
import { motion } from "motion/react"
import { useNavigate } from 'react-router-dom';
import Heading from '../Components/Heading';
// import * as motion from "motion/client"

const Home = () => {
  const navigate = useNavigate();
  const [addAll, setAddAll] = useState([]);
  const [activeCard, setActiveCard] = useState(null);

  // Data for each card and its modal content
  const cardData = [
    {
      id: 1,
      title: "How It Works",
      subtitle: "Our Lost and Found system connects individuals to help find missing items quickly and efficiently.",
      image: "/how it works.jpg",
      modalContent: "The Lost and Found system allows users to report lost items and search for items that might have been found by others. Once a report is made, the system notifies users about any matching items. If a match is found, users can coordinate pickup or drop-off of the item. Whether you're missing keys, a wallet, or a personal item, our platform works to reunite people with their belongings."
    },
    {
      id: 2,
      title: "Event Schedule",
      subtitle: "We organize periodic events to facilitate the exchange of lost and found items in local communities.",
      image: "/event.jpg",
      modalContent: "Our next Lost and Found event will take place from January 5th to January 10th. During this event, individuals can bring any items they've found or report missing items. The event will be hosted at various community centers, and participants can browse through items that have been reported lost or found. Volunteers will assist with registering items and providing information to help connect the right items with the right owners."
    },
    {
      id: 3,
      title: "Regions Served",
      subtitle: "Our Lost and Found service covers key regions, helping people reconnect with their lost belongings in multiple locations.",
      image: "/region.jpg",
      modalContent: "We operate in several cities and regions to help people recover lost items. From bustling cities like Dhaka to smaller rural areas, our network is wide, and our goal is to ensure that no matter where you lose an item, there's always a way to retrieve it. Our network helps people reconnect across the country, from the urban to the remote."
    },
    {
      id: 4,
      title: "About Us",
      subtitle: "We are a dedicated service aiming to bring lost items back to their rightful owners.",
      image: "/about us.jpg",
      modalContent: "We are a team of passionate individuals committed to providing an easy and efficient solution for lost and found items. Our mission is to bridge the gap between lost items and their owners by creating a platform where individuals can quickly report, search, and recover missing belongings. Through our innovative approach, we aim to create a more connected community."
    },
  ];

  // const openModal = (cardId) => {
  //   setActiveCard(cardId);
  // };

  const openModal = (cardId) => {
    if (cardId === 1 || cardId === 2) {
      navigate('/error'); // Redirect to error page
    } else {
      setActiveCard(cardId); // Open modal for other cards
    }
  };

  // Function to close modal
  const closeModal = () => {
    setActiveCard(null);
  };


  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const { data } = await axios.get('https://where-is-it-server-side-three.vercel.app/Get-Allhome-lostFound');
      setAddAll(data);  // Store the most recent 6 items
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  return (
    <div className="sm:mx-auto  w-full my-10 ">
      <motion.div
        initial={{ opacity: 0, y: -50 }}  // Starting position: hidden and above
        animate={{ opacity: 1, y: 0 }}    // End position: fully visible and at normal position
        transition={{ duration: 2 }}     // Transition duration
        className="space-y-5"
      >
        <div className='flex flex-col gap-4 justify-center items-center my-12 text-black mx-4  '>

          {/* <h1 className='text-5xl leading-tight text-center font-bold'>
            WhereIsIt - Helping You Reconnect with What Matters Most
          </h1> */}

          <Heading title='WhereIsIt - Helping You Reconnect with What Matters Most' />

          <h1 className='text-center'>
           
            <p>WhereIsIt is a comprehensive lost and found platform designed to help individuals quickly locate their missing items.
            By connecting users who have lost items with those who have found them, WhereIsIt aims to streamline the process of recovering lost belongings.
            Whether it's a misplaced wallet, keys, or any other personal item, our service provides an efficient and user-friendly way to report, search,
            and retrieve lost items, fostering a community of helpful individuals working together to reunite owners with their possessions.
            </p>

          </h1>



        </div>

        <div className="carousel w-full h-[600px]  ">
          <div id="slide1" className="carousel-item relative w-full">
            <img
              src="/pexels-fotios-photos-3974405.jpg"
              className="w-full h-full object-cover rounded-xl" />
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a href="#slide4" className="btn btn-circle">❮</a>
              <a href="#slide2" className="btn btn-circle">❯</a>
            </div>
          </div>
          <div id="slide2" className="carousel-item relative w-full">
            <img
              src="/pexels-kampus-7843936.jpg"
              className="w-full h-full object-cover  rounded-xl" />
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a href="#slide1" className="btn btn-circle">❮</a>
              <a href="#slide3" className="btn btn-circle">❯</a>
            </div>
          </div>
          <div id="slide3" className="carousel-item relative w-full">
            <img
              src="/pexels-karolina-grabowska-4471315.jpg"
              className="w-full h-full object-cover  rounded-xl" />
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a href="#slide2" className="btn btn-circle">❮</a>
              <a href="#slide4" className="btn btn-circle">❯</a>
            </div>
          </div>
          <div id="slide4" className="carousel-item relative w-full  ">
            <img
              src="/pexels-prateekkatyal-2740956.jpg"
              className="w-full rounded-xl object-cover" />
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a href="#slide3" className="btn btn-circle">❮</a>
              <a href="#slide1" className="btn btn-circle">❯</a>
            </div>
          </div>
        </div>
        <div className='p-12 '>
          <h1 className='text-center font-bold text-5xl'>Latest Find & Lost Items </h1>
          <p className='text-center my-3'> WhereIsIt Helps You Quickly Locate Your Lost Items with Minimal Effort, Connecting You with Others to Ensure What’s Missing Finds Its Way Back Home. <br />
            </p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
          {addAll.map((item) => (
            <All_Items_Card key={item._id} item={item} isHomePage={true} />
          ))}
        </div>


        <div className='p-10'>
          {/* <h1 className='text-5xl text-center font-bold'>All about WhereIsIt</h1> */}
          <Heading title={'All about WhereIsIt'} />
          <p className='text-center my-3'> Our platform connects people in need with a community of good Samaritans, making sure that lost belongings find their way back home. We believe that finding lost things should be easy, fast, and reliable.<br />
          </p>
        
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10 w-full ">
          {cardData.map((card) => (
            <div
              key={card.id}
              className="card bg-base-100 image-full w-full h-72 shadow-xl cursor-pointer "
              onClick={() => openModal(card.id)} // Open modal for specific card
            >
              <figure>
                <img src={card.image} className='w-full' alt={card.title} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{card.title}</h2>
                <p>{card.subtitle}</p>
              </div>
            </div>
          ))}
        </div>


        {/* Modal */}
        {activeCard && (
          <dialog
            open
            className="modal  flex items-center justify-center my-10"
          >
            <div className="modal-box w-full max-w-5xl">
              <h3 className="font-bold text-lg">
                {cardData.find((card) => card.id === activeCard)?.title}
              </h3>
              <p className="py-4">
                {cardData.find((card) => card.id === activeCard)?.modalContent}
              </p>
              <div className="modal-action">
                <button className="btn" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </dialog>
        )}
      </motion.div>

    </div >
  );
};

export default Home;




/*
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import All_Items_Card from '../Components/All_Items_Card';

const Home = () => {
  const [addAll, setAddAll] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const { data } = await axios.get('https://where-is-it-server-side-three.vercel.app/Get-Allhome-lostFound');
      setAddAll(data);  // Store the most recent 6 items
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  return (
    <div className="mx-auto w-full">
      <div className='flex flex-col gap-4 justify-center items-center my-12 text-black mx-4'>
        <div className='space-y-5'>
          <h1 className=' text-5xl leading-tight text-center font-bold'>WhereIsIt - Helping You Reconnect with What Matters Most</h1>
          <h1 className=' text-center'>WhereIsIt Helps You Quickly Locate Your Lost Items with Minimal Effort, Connecting You with Others to Ensure What’s Missing Finds Its Way Back Home. <br /></h1>
        </div>
      </div>

      <div className="carousel w-full h-[600px]">
         Carousel items... 
      </div>

      <div className='mt-14 mb-5'>
        <h1 className='text-center font-bold text-5xl'>Latest Find & Lost Items</h1>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
        {addAll.map((item) => (
          <All_Items_Card key={item._id} item={item} isHomePage={true} />
        ))}
      </div>
    </div>
  );
};

export default Home;





*/