import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const HotelCard = ({ room, index }) => {
  return (
    <div className="bg-white">
      <Link
        className="relative w-[360px] sm:w-[400px] rounded-xl overflow-hidden bg-white text-gray-500/90 shadow-md"
        to={`/rooms/${room._id}`}
        onClick={() => scrollTo(0, 0)}
        key={room._id}
      >
        <img
          src={room.images[0]}
          alt="Hotel"
          className="w-full h-52 sm:h-60 object-cover rounded-xl"
        />

        {index % 2 === 0 && (
          <p className="absolute top-3 left-3 text-sm px-4 py-1 bg-white text-gray-700 font-semibold rounded-full shadow">
            Best Seller
          </p>
        )}

        <div className="p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="font-playfair text-2xl font-semibold text-gray-800">
              {room.hotel.name}
            </p>
            <div className="flex items-center gap-1 text-base text-yellow-500">
              <img src={assets.starIconFilled} alt="star-icon" className="h-5" />
              {room.rating || '4.5'}
            </div>
          </div>

          <div className="flex items-center gap-2 text-base text-gray-600 mb-4">
            <img src={assets.locationIcon} alt="location-icon" className="h-4 w-4" />
            <span>{room.hotel.address}</span>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-xl font-bold text-gray-800">
              ${room.pricePerNight}{' '}
              <span className="text-base font-normal text-gray-500">/night</span>
            </p>
            <button className="ml-4 px-5 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition">
              Book now
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default HotelCard;
