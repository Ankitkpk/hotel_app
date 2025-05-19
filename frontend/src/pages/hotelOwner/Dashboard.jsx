import React, { useState } from 'react';
import Title from '../../components/Title';
import { dashboardDummyData, assets } from '../../assets/assets';

const Dashboard = () => {
  const [dashboarddata, setDashboardData] = useState(dashboardDummyData);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      <Title
        align="left"
        font="outfit"
        title="Dashboard"
        subtitle="Monitor room listings, track bookings, and analyze revenue—all in one place. Updated with real-time insights to ensure smooth operations."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-8">
        <div className="bg-white shadow-md border border-gray-200 rounded-xl flex items-center p-5 transition-transform hover:scale-[1.02] hover:shadow-lg">
          <img src={assets.totalBookingIcon} alt="" className="hidden sm:block h-12 w-12" />
          <div className="flex flex-col ml-4">
            <p className="text-blue-600 text-lg font-semibold">Total Bookings</p>
            <p className="text-gray-500 text-base">{dashboarddata.totalBookings}</p>
          </div>
        </div>
        <div className="bg-white shadow-md border border-gray-200 rounded-xl flex items-center p-5 transition-transform hover:scale-[1.02] hover:shadow-lg">
          <img src={assets.totalRevenueIcon} alt="" className="hidden sm:block h-12 w-12" />
          <div className="flex flex-col ml-4">
            <p className="text-blue-600 text-lg font-semibold">Total Revenue</p>
            <p className="text-gray-500 text-base">{dashboarddata.totalRevenue}</p>
          </div>
        </div>
        {/* You can add more cards like this for Revenue, Listings, etc. */}
      </div>
      <h2 className='text-xl text-blue-950/50 font-medium mb-5'>Recent Bookings</h2>
<div className='w-full max-w-5xl text-left border border-gray-300 rounded-lg max-h-[26rem] overflow-y-scroll overflow-x-auto'>
  <table className='w-full min-w-[700px]'>
    <thead className='bg-gray-50'>
      <tr>
        <th className='py-3 px-4 text-gray-800 font-medium'>User Name</th>
        <th className='py-3 px-4 text-gray-800 font-medium'>Room Name</th>
        <th className='py-3 px-4 text-gray-800 font-medium'>Total Amount</th>
        <th className='py-3 px-4 text-gray-800 font-medium'>Payment Status</th>
      </tr>
    </thead>
    <tbody className='text-sm'>
      {dashboarddata.bookings.map((item, index) => (
        <tr key={index} className="even:bg-gray-50">
          <td className='py-3 px-4 text-gray-800'>{item.user.username}</td>
          <td className='py-3 px-4 text-gray-800'>{item.room.roomType}</td>
          <td className='py-3 px-4 text-gray-800'>₹{item.totalPrice}</td>
          <td className='py-3 px-4'>
            <button
              className={`px-3 py-1 rounded-full text-xs font-semibold
                ${item.status === 'completed'
                  ? 'bg-green-100 text-green-700'
                  : item.status === 'Pending'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-red-100 text-red-700'}
              `}
            >
              {item.status}
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
    </div>
  );
};

export default Dashboard;
