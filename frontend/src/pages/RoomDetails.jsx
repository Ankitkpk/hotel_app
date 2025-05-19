import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { assets, facilityIcons, roomCommonData, roomsDummyData } from '../assets/assets';
import StartRattig from '../components/StartRattig';

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [mainimage, setMainImage] = useState(null);

  useEffect(() => {
    const foundRoom = roomsDummyData.find((room) => room._id === id);
    foundRoom && setRoom(foundRoom);
    foundRoom && setMainImage(foundRoom.images[0]);
  }, [id]);

  if (!room) {
    return <div className='mt-20 text-center'>Loading room details...</div>;
  }

  return (
    <div className='py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32'>
      {/* Room Header */}
      <div className='flex flex-col md:flex-row items-start md:items-center  gap-4'>
        <h1 className='text-3xl md:text-4xl font-playfair'>
          {room.hotel.name}{' '}
          <span className='font-inter text-sm'>({room.roomType})</span>
        </h1>
        <p className='text-sm text-white bg-orange-600 rounded-full px-2 py-1'>
          20% OFF
        </p>
      </div>

      {/* Ratings */}
      <div className='flex items-center gap-4 mt-2'>
        <StartRattig />
        <p>200+ reviews</p>
      </div>

      {/* Address */}
      <div className='flex items-center gap-2 text-gray-500 mt-2'>
        <img src={assets.locationIcon} alt='locationIcon' />
        <span>{room.hotel.address}</span>
      </div>

      {/* Images */}
      <div className='flex flex-col lg:flex-row mt-6 gap-6'>
        <div className='lg:w-1/2 w-full'>
          <img
            src={mainimage}
            alt='mainImage'
            className='w-full rounded-xl shadow-lg object-cover'
          />
        </div>
        <div className='grid grid-cols-2 gap-4 lg:w-1/2 w-full'>
          {room.images.length > 1 &&
            room.images.map((image, index) => (
              <img
                key={index}
                onClick={() => setMainImage(image)}
                src={image}
                alt={`thumb-${index}`}
                className={`w-full rounded-xl shadow-md object-cover cursor-pointer ${
                  mainimage === image
                    ? 'outline outline-2 outline-orange-500 outline-offset-2'
                    : ''
                }`}
              />
            ))}
        </div>
      </div>

      {/* Highlights */}
      <div className='flex flex-col md:flex-row justify-between mt-10 gap-10'>
        <div className='flex-1'>
          <h1 className='text-3xl md:text-4xl text-gray-700'>
            Experience Luxury like never before
          </h1>
          <div className='flex flex-wrap items-center gap-4 mt-3 mb-6 pt-2'>
            {room.amenities.map((item, index) => (
              <div
                key={index}
                className='flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg bg-[#F5F5FF]/50'
              >
                <img className='w-4 h-4' src={facilityIcons[item]} alt={item} />
                <p className='text-sm text-gray-700'>{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Price */}
        <div className='flex items-center'>
          <p className='text-2xl font-medium'>
            ${room.pricePerNigh}/<span className='text-base'>night</span>
          </p>
        </div>
      </div>

      {/* Booking Form */}
      <form className='flex flex-col md:flex-row flex-wrap items-start md:items-center justify-between gap-6 bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-16 max-w-full'>
        <div className='flex flex-col w-full md:w-auto'>
          <label htmlFor='checkInDate' className='font-medium mb-1'>
            Check-In
          </label>
          <input
            type='date'
            id='checkInDate'
            placeholder='Check-In'
            className='border border-gray-300 rounded-md px-4 py-2 w-full placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500'
          />
        </div>
        <div className='flex flex-col w-full md:w-auto'>
          <label htmlFor='checkOutDate' className='font-medium mb-1'>
            Check-Out
          </label>
          <input
            type='date'
            id='checkOutDate'
            placeholder='Check-Out'
            className='border border-gray-300 rounded-md px-4 py-2 w-full placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500'
          />
        </div>
        <div className='flex flex-col w-full md:w-auto'>
          <label htmlFor='guests' className='font-medium mb-1'>
            Guests
          </label>
          <input
            type='number'
            id='guests'
            placeholder='Guests'
            className='border border-gray-300 rounded-md px-4 py-2 w-full placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500'
          />
        </div>
        <button
          type='submit'
          className='bg-orange-600 hover:bg-orange-700 active:scale-95 transition-all text-white rounded-md max-md:w-full md:px-12 py-3 text-base cursor-pointer'
        >
          Check Avaialability
        </button>
      </form>
      {/*commmon specification */}
      <div className=' flex flex-col mt-20'>
         {roomCommonData.map((spec, index) => (
      <div key={index} className='flex items-start gap-4 py-6'>
      <img src={spec.icon} alt={spec.title} className='w-8 h-10' />
      <div className='flex flex-col'>
      <p className='text-[1.375rem] font-semibold text-gray-800'>{spec.title}</p>
      <p className='text-[1.125rem] text-gray-500'>{spec.description}</p>
      </div>
    </div>
  ))}
</div>
<div className='max-w-3xl border-y border-gray-300 my-15 py-10 text-gray-500'>
  <p>Guests will be allocated on the ground floor according to availability you get a comfortable Two bedroom apartment has a true city feeeling. the price quoted is for two guest at the guest slot please mark the number of guests to get the exact price for groups. The Guests will be allocated ground floor according to availability. you get the comfortable two bedroom apartment that has a true city feeling</p>
</div>
{/* hosted by */}
<div className="flex flex-col items-start gap-4 mt-10">
  <div className="flex items-center gap-4">
    <img
      src={room.hotel.owner.image}
      alt="Host"
      className="h-14 w-14 md:h-18 md:w-18 rounded-full object-cover"
    />
    <div>
      <p className="text-lg font-semibold text-gray-800">Hosted by {room.hotel.name}</p>
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <StartRattig />
        <p>200+ reviews</p>
      </div>
    </div>
  </div>
</div>
 </div>
  );
};

export default RoomDetails;
