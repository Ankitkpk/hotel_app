import React, { useState } from 'react';
import { assets, facilityIcons, roomsDummyData } from '../assets/assets';
import { useNavigate } from 'react-router';
import StartRattig from '../components/StartRattig';

const CheckBox = ({ label, selected = false, onChange = () => {} }) => {
    return (
      <label className='flex gap-3 items-center cursor-pointer mt-2 text-sm'>
        <input
          type="checkbox"
          checked={selected}
          onChange={(e) => onChange(e.target.checked, label)}
        />
        <span className='font-light select-none'>{label}</span>
      </label>
    );
  };

  const RadioButton = ({ label, selected = false, onChange = () => {} }) => {
    return (
      <label className='flex gap-3 items-center cursor-pointer mt-2 text-sm'>
        <input
          type="radio"
          checked={selected}
          onChange={(e) => onChange(label)}
        />
        <span className='font-light select-none'>{label}</span>
      </label>
    );
  };

const Allrooms = () => {
  const navigate = useNavigate();
  const [openFilters,setOpenFilters]=useState(false);


  const roomTypes=[
   "Single Bed",
   "Double Bed",
   "Luxury Room",
   "Family Suite"
  ];
  const priceRanges=[
     '0 to 500',
     '500 to 1000',
     '1000 to 2000',
      '2000 to 3000'
  ];

  const sortOptions=[
     'Price Low to High',
      'Price High to Low',
      'Newest First'
  ]

  const handleNavigate = (id) => {
    scrollTo(0, 0);
    navigate(`/rooms/${id}`);
  };

  return (
    <div className=' flex flex-col-reverse lg:flex-row items-start justify-between pt-28 md:pt-32 px-4 md:px-18 lg:px-24 xl:px-32 w-full'>
       <div >
        <div className='flex flex-col items-start text-left'>
        <h1 className='font-playfair text-4xl md:text-[40px]'>Hotel Rooms</h1>
        <p className='text-sm md:text-base text-gray-500 mt-2 max-w-2xl'>
          Take advantage of our limited-time offers and special packages to make your stay unforgettable.
        </p>
      </div>

      {/* Room Cards */}
      <div className='flex flex-col gap-2'>
        {roomsDummyData.map((room) => (
          <div
            key={room._id}
            className='flex flex-col md:flex-row gap-4 p-4 bg-white rounded-xl shadow-lg'
          >
            {/* Room Image */}
            <img
              src={room.images[0]}
              alt={`${room.hotel.name} - Room`}
              title="View Room Details"
              onClick={() => handleNavigate(room._id)}
              className='w-full md:w-1/2 h-48 object-cover rounded-lg cursor-pointer'
            />

            {/* Room Info */}
            <div className='flex flex-col justify-between md:w-1/2'>
              <div>
                <p className='text-gray-500 text-sm'>{room.hotel.city}</p>
                <h2
                  onClick={() => handleNavigate(room._id)}
                  className='text-lg font-semibold cursor-pointer hover:underline'
                >
                  {room.hotel.name}
                </h2>
              </div>

              <div className='flex items-center gap-2 mt-1'>
                <StartRattig />
                <p className='text-sm text-gray-600'>200+ reviews</p>
              </div>

              <div className='flex items-center gap-2 text-gray-500 mt-3 text-sm'>
                <img
                  src={assets.locationIcon}
                  alt="location-icon"
                  className='w-4 h-4'
                />
                <span>{room.hotel.address}</span>
              </div>
              {/* room amenities */}
              <div className='flex flex-wrap items-center gap-4 mt-3 mb-6 pt-2'>
               {
               room.amenities.map((item, index) => (
              <div
              key={index}
              className='flex items-center px-4  py-2 bg-gray-100 rounded-lg bg-[#F5F5FF]/50'
              >
              <img className='w-4 h-4' src={facilityIcons[item]} alt={item} />
              <p className='text-sm text-gray-700'>{item}</p>
             </div>
             ))
            }
           </div>
           <p className='text-xl font-medium text-gray-700'>${room.pricePerNight}/Night</p>
           
            </div>
          </div>
        ))}
      </div>
      </div>

      {/* Filters - placeholder for now */}
      <div className='bg-white w-80 border border-gray-300 text-gray-500 mb-8 lg:mb-0 lg:mt-16'>
       <div className={`flex items-center justify-between px-5 py-2.5 lg:border-b border-gray-300 ${openFilters && "border-b" }`} >
       <p className='text-base font-medium text-gray-800'>FILTERS</p>
        <div onClick={()=>setOpenFilters(!openFilters)} className='text-sm  cursor-pointer'>
            <span className='lg:hidden'>{openFilters ? 'SHOW':'HIDE'}</span>
            <span className='hidden lg:block'>CLEAR</span>
        </div>
     </div>
     <div className={`${openFilters? 'h-auto' : 'h-0 lg:h-auto'} overflow-hidden transition-all duration-700`}>
        <div className='px-5 pt-5'>
        <p className='text-base font-medium text-gray-800 '>Popular filters</p>
        {
            roomTypes.map((room,index)=>(
              <CheckBox key={index} label={room}/>
            ))
           }
      
        </div>
        <div className='px-5 pt-5'>
        <p className='text-base font-medium text-gray-800'>Price</p>
        {
            priceRanges.map((range,index)=>(
              <CheckBox key={index} label={`$${range}`}/>
            ))
           }
        </div>
        <div className='px-5 pt-5 pb-5'>
        <p className='text-base font-medium text-gray-800'>Sort By</p>
        {
            sortOptions.map((options,index)=>(
            <RadioButton key={index} label={options}/>
              
            ))
           }
        </div>

     </div>
    </div>
   </div>
  );
};

export default Allrooms;
