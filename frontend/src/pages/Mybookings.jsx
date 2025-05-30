import React, { useContext, useEffect, useState } from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const MyBookings = () => {
  const { getToken, axios, user } = useContext(AppContext);
  const [bookings, setBookings] = useState([]);
<<<<<<< HEAD
  const [loading, setLoading] = useState(false);

  const fetchMyBookings = async () => {
    setLoading(true);
=======

  const fetchMyBookings = async () => {
>>>>>>> a306ffc3d39097587de5a3f717cc08727c072888
    try {
      const token = await getToken();
      const response = await axios.get('/api/booking/getbookings', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
<<<<<<< HEAD

      console.log('booking data response is', response);
=======
      
      console.log(`booking data response is ${response}`);
>>>>>>> a306ffc3d39097587de5a3f717cc08727c072888

      if (response.data?.success) {
        setBookings(response.data.bookings || []);
        toast.success('Booking list fetched successfully!');
      } else {
        toast.error('Failed to fetch booking list.');
      }
    } catch (error) {
      console.error('Fetch Bookings Error:', error);
      toast.error('Something went wrong while fetching bookings.');
<<<<<<< HEAD
    } finally {
      setLoading(false);
    }
  };

  const handleBookingspayment = async (bookingId) => {
    try {
      const token = await getToken();

      const { data } = await axios.post(
        '/api/booking/stripe-payment',
        { bookingId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        window.location.href = data.url;
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || 'Payment failed');
      console.error('Error creating Stripe payment:', error);
    }
  };

=======
    }
  };
//handle bookings//
const handleBookingspayment = async (bookingId) => {
  try {
    const token = await getToken();

    const { data } = await axios.post(
      '/api/booking/stripe-payment',
      { bookingId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if(data.success){
      window.location.href=data.url
    }else
    {
       toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
    console.error("Error creating Stripe payment:", error);
  }
};
>>>>>>> a306ffc3d39097587de5a3f717cc08727c072888
  useEffect(() => {
    if (user) {
      fetchMyBookings();
    }
  }, [user]);

<<<<<<< HEAD
  const formatDate = (dateStr) =>
    dateStr
      ? new Date(dateStr).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : 'N/A';

=======
>>>>>>> a306ffc3d39097587de5a3f717cc08727c072888
  return (
    <div className="flex flex-col mt-20 py-10 px-4 md:px-16 lg:px-24 xl:px-32">
      <Title
        title="My Bookings"
        subtitle="Easily manage your past, current, and upcoming hotel reservations in one place. Plan your trips seamlessly with just a few clicks."
        align="left"
      />

      <div className="max-w-full mt-8 w-full text-gray-800">
<<<<<<< HEAD
=======
        {/* Table Header */}
>>>>>>> a306ffc3d39097587de5a3f717cc08727c072888
        <div className="hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 font-medium text-lg py-3">
          <div>Hotels</div>
          <div>Date & Timings</div>
          <div>Payment</div>
        </div>
<<<<<<< HEAD
        {loading && (
          <p className="text-center text-gray-500 mt-10 animate-pulse">Loading bookings...</p>
        )}
        {!loading && bookings.length === 0 ? (
=======

        {/* Booking Entries */}
        {bookings.length === 0 ? (
>>>>>>> a306ffc3d39097587de5a3f717cc08727c072888
          <p className="mt-10 text-gray-600">No bookings found.</p>
        ) : (
          bookings.map((booking, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] gap-6 md:gap-4 items-start border-b border-gray-200 py-6 text-base"
            >
<<<<<<< HEAD
=======
              {/* Hotel Info */}
>>>>>>> a306ffc3d39097587de5a3f717cc08727c072888
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
<<<<<<< HEAD
                    {formatDate(booking.checkInDate)}
=======
                    {new Date(booking.checkInDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
>>>>>>> a306ffc3d39097587de5a3f717cc08727c072888
                  </span>
                </p>
                <p>
                  Check-out:{' '}
                  <span className="text-gray-900 font-semibold">
<<<<<<< HEAD
                    {formatDate(booking.checkOutDate)}
                  </span>
                </p>
              </div>
=======
                    {new Date(booking.checkOutDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </p>
              </div>

              {/* Payment */}
>>>>>>> a306ffc3d39097587de5a3f717cc08727c072888
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
<<<<<<< HEAD
                  <button
                    onClick={() => handleBookingspayment(booking._id)}
                    className="bg-gray-800 text-white rounded-full px-5 py-2 hover:bg-gray-900 transition-all"
                  >
=======
                  <button onClick={()=>handleBookingspayment(booking._id)} className="bg-gray-300 text-white rounded-full px-5 py-2 hover:bg-gray-800 transition-all">
>>>>>>> a306ffc3d39097587de5a3f717cc08727c072888
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
