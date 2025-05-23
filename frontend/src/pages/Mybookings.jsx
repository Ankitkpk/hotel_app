import React, { useContext, useEffect, useState } from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const MyBookings = () => {
  const { getToken, axios, user } = useContext(AppContext);
  const [bookings, setBookings] = useState([]);

  const fetchMyBookings = async () => {
    try {
      const token = await getToken();
      const response = await axios.get('/api/booking/getbookings', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      console.log(`booking data response is ${response}`);

      if (response.data?.success) {
        setBookings(response.data.bookings || []);
        toast.success('Booking list fetched successfully!');
      } else {
        toast.error('Failed to fetch booking list.');
      }
    } catch (error) {
      console.error('Fetch Bookings Error:', error);
      toast.error('Something went wrong while fetching bookings.');
    }
  };

  useEffect(() => {
    if (user) {
      fetchMyBookings();
    }
  }, [user]);

  return (
    <div className="flex flex-col mt-20 py-10 px-4 md:px-16 lg:px-24 xl:px-32">
      <Title
        title="My Bookings"
        subtitle="Easily manage your past, current, and upcoming hotel reservations in one place. Plan your trips seamlessly with just a few clicks."
        align="left"
      />

      <div className="max-w-full mt-8 w-full text-gray-800">
        {/* Table Header */}
        <div className="hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 font-medium text-lg py-3">
          <div>Hotels</div>
          <div>Date & Timings</div>
          <div>Payment</div>
        </div>

        {/* Booking Entries */}
        {bookings.length === 0 ? (
          <p className="mt-10 text-gray-600">No bookings found.</p>
        ) : (
          bookings.map((booking, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] gap-6 md:gap-4 items-start border-b border-gray-200 py-6 text-base"
            >
              {/* Hotel Info */}
              <div className="flex gap-4">
                <img
                  src={booking.room?.images?.[0] || assets.placeholder}
                  alt="Room"
                  className="w-28 h-28 object-cover rounded-md shadow-md"
                />
                <div className="flex flex-col gap-1 leading-relaxed">
                  <p className="text-2xl font-playfair font-semibold text-gray-900">
                    {booking.hotel?.name || 'Hotel Name'}
                  </p>
                  <div className="flex gap-1 items-center">
                    <img src={assets.locationIcon} alt="location" className="w-4 h-4" />
                    <p className="text-gray-600 text-base">{booking.hotel?.address || 'Address not available'}</p>
                  </div>
                  <p className="text-gray-600 text-base">{booking.room?.roomType || 'Room Type'}</p>
                  <div className="flex gap-1 items-center">
                    <img src={assets.guestsIcon} alt="guest" className="w-4 h-4" />
                    <p className="text-gray-600 text-base">Guests: {booking.guests}</p>
                  </div>
                  <p className="text-lg mt-1 text-gray-800 font-medium">Total: ${booking.totalPrice}</p>
                </div>
              </div>

              {/* Dates */}
              <div className="flex flex-col justify-center gap-2 text-gray-700 text-base">
                <p>
                  Check-in:{' '}
                  <span className="text-gray-900 font-semibold">
                    {new Date(booking.checkInDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </p>
                <p>
                  Check-out:{' '}
                  <span className="text-gray-900 font-semibold">
                    {new Date(booking.checkOutDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </p>
              </div>

              {/* Payment */}
              <div className="flex flex-col items-start gap-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      booking.isPaid ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  ></div>
                  <p
                    className={`font-semibold ${
                      booking.isPaid ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {booking.isPaid ? 'Paid' : 'Unpaid'}
                  </p>
                </div>
                {!booking.isPaid && (
                  <button className="bg-black text-white rounded-full px-5 py-2 hover:bg-gray-800 transition-all">
                    Pay Now
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyBookings;
