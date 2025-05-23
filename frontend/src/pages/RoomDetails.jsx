import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { assets, facilityIcons, roomCommonData } from '../assets/assets';
import { AppContext } from '../context/appContext';
import StarRating from '../components/StartRattig';

const RoomDetails = () => {
  const { id } = useParams();
  const { roomdata, getToken,navigate} = useContext(AppContext);

  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState(1);
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    const foundRoom = roomdata.find((room) => room._id === id);
    if (foundRoom) {
      setRoom(foundRoom);
      setMainImage(foundRoom.images[0]);
    }
  }, [id, roomdata]);

  const handleAvailability = async (e) => {
    e.preventDefault();
    if (!checkInDate || !checkOutDate || !guests) return;

    try {
      const response = await axios.post('/api/booking/check-availability', {
         room: id,
        checkInDate,
        checkOutDate,
        guests,
      });

      if (response.data.isAvailable) {
        setIsAvailable(true);
        toast.success('Room is available');
      } else {
        setIsAvailable(false);
        toast.error('Room not available');
      }
    } catch (error) {
      console.error('Error checking availability:', error);
      toast.error('Availability check failed');
    }
  };

  const handleBooking = async () => {
    try {
      const token=await getToken();
      const response = await axios.post(
        '/api/booking/book',
        {
          room: id,
          checkInDate,
          checkOutDate,
          guests,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success('Booking successful!');
      setCheckInDate('');
      setCheckOutDate('');
      setGuests(1);
      setIsAvailable(false);
      navigate('/my-booking');
    } catch (error) {
      console.error('Booking failed:', error);
      toast.error(error?.response?.data?.message || 'Booking failed');
    }
  };

  if (!room) return <div className="mt-20 text-center">Loading room details...</div>;

  return (
    <div className="py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
        <h1 className="text-3xl md:text-4xl font-playfair">
          {room.hotel.name} <span className="font-inter text-sm">({room.roomType})</span>
        </h1>
        <p className="text-sm text-white bg-orange-600 rounded-full px-2 py-1">20% OFF</p>
      </div>

      <div className="flex items-center gap-4 mt-2">
        <StarRating />
        <p>200+ reviews</p>
      </div>
      <div className="flex items-center gap-2 text-gray-500 mt-2">
        <img src={assets.locationIcon} alt="location" />
        <span>{room.hotel.address}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        <div className="lg:w-1/2">
          <img
            src={mainImage}
            alt="Main"
            className="w-full rounded-xl object-cover shadow-lg"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 lg:w-1/2">
          {room.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`thumb-${index}`}
              onClick={() => setMainImage(image)}
              className={`rounded-xl cursor-pointer object-cover shadow-md ${
                mainImage === image ? 'outline outline-orange-500 outline-2' : ''
              }`}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between mt-10 gap-10">
        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl text-gray-700">
            Experience Luxury like never before
          </h2>
          <div className="flex flex-wrap gap-4 mt-4 mb-6">
            {room.amenities.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2 bg-[#F5F5FF]/50 rounded-lg"
              >
                <img src={facilityIcons[item]} alt={item} className="w-4 h-4" />
                <p className="text-sm text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center">
          <p className="text-2xl font-semibold">
            ${room.pricePerNight}/<span className="text-base">night</span>
          </p>
        </div>
      </div>

      <form
        className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-white shadow-lg p-6 rounded-xl mt-16"
        onSubmit={handleAvailability}
      >
        <div className="flex flex-col">
          <label htmlFor="checkInDate" className="font-medium mb-1">Check-In</label>
          <input
            type="date"
            id="checkInDate"
            value={checkInDate}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => {
              setCheckInDate(e.target.value);
              setCheckOutDate('');
              setIsAvailable(false);
            }}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="checkOutDate" className="font-medium mb-1">Check-Out</label>
          <input
            type="date"
            id="checkOutDate"
            value={checkOutDate}
            min={checkInDate}
            disabled={!checkInDate}
            onChange={(e) => {
              setCheckOutDate(e.target.value);
              setIsAvailable(false);
            }}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="guests" className="font-medium mb-1">Guests</label>
          <input
            type="number"
            id="guests"
            value={guests}
            min={1}
            onChange={(e) => setGuests(Number(e.target.value))}
            disabled={!checkInDate}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div className="flex items-end">
          {!isAvailable ? (
            <button
              type="submit"
              className="bg-orange-600 hover:bg-orange-700 active:scale-95 transition-all text-white rounded-md w-full md:w-auto px-6 py-3"
            >
              Check Availability
            </button>
          ) : (
            <button
              type="button"
              onClick={handleBooking}
              className="bg-green-600 hover:bg-green-700 active:scale-95 transition-all text-white rounded-md w-full md:w-auto px-6 py-3"
            >
              Book Now
            </button>
          )}
        </div>
      </form>

      <div className="mt-20 space-y-6">
        {roomCommonData.map((spec, index) => (
          <div key={index} className="flex items-start gap-4">
            <img src={spec.icon} alt={spec.title} className="w-8 h-10" />
            <div>
              <p className="text-xl font-semibold text-gray-800">{spec.title}</p>
              <p className="text-lg text-gray-500">{spec.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-3xl border-y border-gray-300 my-16 py-10 text-gray-500">
        <p>
          Guests will be allocated on the ground floor according to availability. You get a
          comfortable two-bedroom apartment with a true city feeling. The price quoted is for two
          guests — please mark the number of guests to get the exact price for groups.
        </p>
      </div>

      <div className="flex flex-col items-start gap-4 mt-10">
        <div className="flex items-center gap-4">
          <img
            src={room.hotel.owner.image}
            alt="Host"
            className="h-14 w-14 rounded-full object-cover"
          />
          <div>
            <p className="text-lg font-semibold text-gray-800">
              Hosted by {room.hotel.owner.name}
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <StarRating />
              <p>200+ reviews</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
