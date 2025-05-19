import React, { useState } from 'react'
import Title from '../components/Title'
import { assets, userBookingsDummyData } from '../assets/assets'

const Mybookings = () => {
  const [bookings, setBookings] = useState(userBookingsDummyData)

  return (
    <div className='flex flex-col mt-20 py-10 px-4 md:px-16 lg:px-24 xl:px-32'>
      <Title
        title='My Booking'
        subtitle='Easily manage your past, current, and upcoming hotel reservations in one place. Plan your trips seamlessly with just a few clicks.'
        align='left'
      />
      <div className='max-w-full mt-8 w-full text-gray-800'>

        {/* Table Head */}
        <div className='hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 font-medium text-lg py-3'>
          <div>Hotels</div>
          <div>Date & Timings</div>
          <div>Payment</div>
        </div>

        {/* Booking List */}
        {bookings.map((Booking, index) => (
          <div
            key={index}
            className='grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] gap-6 md:gap-4 items-start border-b border-gray-200 py-6 text-base'
          >
            {/* Hotel Info */}
            <div className='flex gap-4'>
              <img
                src={Booking.room.images[0]}
                alt='Room'
                className='w-1/3 h-1/3 object-cover rounded-md shadow-md'
              />
              <div className='flex flex-col leading-relaxed'>
                <p className='text-2xl font-playfair font-semibold text-gray-900'>{Booking.hotel.name}</p>
                <div className='flex gap-1 items-center'>
                  <img src={assets.locationIcon} alt="location" />
                  <p className='text-gray-600 text-base'>{Booking.hotel.address}</p>
                </div>
                <p className='text-gray-600 text-base'>{Booking.room.roomType}</p>
                <div className='flex gap-1 items-center'>
                  <img src={assets.guestsIcon} alt="guest" />
                  <p className='text-gray-600 text-base'>Guests: {Booking.guests}</p>
                </div>
                <p className='text-lg mt-1 text-gray-800 font-medium'>Total: ${Booking.totalPrice}</p>
              </div>
            </div>

            {/* Date & Timings */}
            <div className='flex flex-col justify-center gap-2 text-gray-700 text-base'>
              <p className='flex flex-col'>
                Check-in:{' '}
                <span className='text-gray-900 font-semibold'>
                  {new Date(Booking.checkInDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </p>
              <p className='flex flex-col'>
                Check-out:{' '}
                <span className='text-gray-900 font-semibold'>
                  {new Date(Booking.checkOutDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </p>
            </div>

            {/* Payment Info */}
            <div className='flex flex-col items-start gap-2'>
              <div className='flex items-center gap-2'>
                <div className={Booking.isPaid ? 'w-3 h-3 rounded-full bg-green-500' : 'w-3 h-3 rounded-full bg-red-500'}></div>
                <p className={Booking.isPaid ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                  {Booking.isPaid ? 'Paid' : 'Unpaid'}
                </p>
              </div>
              {
                !Booking.isPaid && (
                  <button className="bg-gray-300 text-white rounded-full px-5 py-2 transition-all hover:bg-gray-400">
                    Pay Now
                  </button>
                )
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Mybookings
