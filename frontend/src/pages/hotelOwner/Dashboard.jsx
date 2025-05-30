import React, { useState, useEffect, useContext } from 'react';
import Title from '../../components/Title';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    bookings: [],
    totalBookings: 0,
    totalRevenue: 0,
  });

<<<<<<< HEAD
  const { axios, getToken, user } = useContext(AppContext);
=======
  const { axios, getToken,user } = useContext(AppContext);
>>>>>>> a306ffc3d39097587de5a3f717cc08727c072888

  const fetchDashboardData = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get('/api/booking/getbookings', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setDashboardData({
          bookings: data.bookings,
          totalBookings: data.totalBookings,
          totalRevenue: data.totalRevenue,
        });
      } else {
        toast.error(data.message || 'Failed to fetch dashboard data');
      }
    } catch (error) {
      console.error('Dashboard fetch error:', error);
      toast.error(error.response?.data?.message || 'Error fetching dashboard data');
    }
  };

  useEffect(() => {
<<<<<<< HEAD
    if (user) {
      fetchDashboardData();
    }
  }, [user]);
=======
    if(user){
     fetchDashboardData();
    }
   
  },[user]);
>>>>>>> a306ffc3d39097587de5a3f717cc08727c072888

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      <Title
        align="left"
        font="outfit"
        title="Dashboard"
        subtitle="Monitor room listings, track bookings, and analyze revenue—all in one place. Updated with real-time insights to ensure smooth operations."
      />

<<<<<<< HEAD
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 my-8">
        <div className="bg-white shadow-md border border-gray-200 rounded-xl flex items-center p-4 sm:p-5 transition-transform hover:scale-[1.02] hover:shadow-lg">
          <img src={assets.totalBookingIcon} alt="Total Bookings" className="hidden sm:block h-10 w-10 sm:h-12 sm:w-12" />
          <div className="flex flex-col ml-3 sm:ml-4">
            <p className="text-blue-600 text-sm sm:text-lg font-semibold">Total Bookings</p>
            <p className="text-gray-500 text-sm sm:text-base">{dashboardData.totalBookings}</p>
          </div>
        </div>
        <div className="bg-white shadow-md border border-gray-200 rounded-xl flex items-center p-4 sm:p-5 transition-transform hover:scale-[1.02] hover:shadow-lg">
          <img src={assets.totalRevenueIcon} alt="Total Revenue" className="hidden sm:block h-10 w-10 sm:h-12 sm:w-12" />
          <div className="flex flex-col ml-3 sm:ml-4">
            <p className="text-blue-600 text-sm sm:text-lg font-semibold">Total Revenue</p>
            <p className="text-gray-500 text-sm sm:text-base">₹{dashboardData.totalRevenue}</p>
=======
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-8">
        <div className="bg-white shadow-md border border-gray-200 rounded-xl flex items-center p-5 transition-transform hover:scale-[1.02] hover:shadow-lg">
          <img src={assets.totalBookingIcon} alt="" className="hidden sm:block h-12 w-12" />
          <div className="flex flex-col ml-4">
            <p className="text-blue-600 text-lg font-semibold">Total Bookings</p>
            <p className="text-gray-500 text-base">{dashboardData.totalBookings}</p>
          </div>
        </div>
        <div className="bg-white shadow-md border border-gray-200 rounded-xl flex items-center p-5 transition-transform hover:scale-[1.02] hover:shadow-lg">
          <img src={assets.totalRevenueIcon} alt="" className="hidden sm:block h-12 w-12" />
          <div className="flex flex-col ml-4">
            <p className="text-blue-600 text-lg font-semibold">Total Revenue</p>
            <p className="text-gray-500 text-base">₹{dashboardData.totalRevenue}</p>
>>>>>>> a306ffc3d39097587de5a3f717cc08727c072888
          </div>
        </div>
      </div>

<<<<<<< HEAD
      {/* Recent Bookings */}
      <h2 className="text-lg sm:text-xl text-blue-950/50 font-medium mb-4 sm:mb-5">Recent Bookings</h2>

      {/* Mobile View */}
      <div className="sm:hidden space-y-4 mb-6">
        {dashboardData.bookings.map((item, index) => (
          <div key={index} className="bg-white border border-gray-200 p-4 rounded-lg shadow">
            <p className="text-sm"><span className="font-medium">User:</span> {item.user.username}</p>
            <p className="text-sm"><span className="font-medium">Room:</span> {item.room.roomType}</p>
            <p className="text-sm"><span className="font-medium">Amount:</span> ₹{item.totalPrice}</p>
            <p className="text-sm">
              <span className="font-medium">Status:</span>{' '}
              <span
                className={`inline-block px-2 py-1 rounded text-xs font-medium
                  ${item.status === 'completed'
                    ? 'bg-green-100 text-green-700'
                    : item.status === 'Pending'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-red-100 text-red-700'}`}
              >
                {item.status}
              </span>
            </p>
          </div>
        ))}
      </div>

      {/* Desktop View */}
      <div className="hidden sm:block w-full max-w-full overflow-x-auto border border-gray-300 rounded-lg max-h-[26rem] overflow-y-auto">
        <table className="w-full min-w-[700px] text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-gray-800 font-medium text-left whitespace-nowrap">User Name</th>
              <th className="py-3 px-4 text-gray-800 font-medium text-left whitespace-nowrap">Room Name</th>
              <th className="py-3 px-4 text-gray-800 font-medium text-left whitespace-nowrap">Total Amount</th>
              <th className="py-3 px-4 text-gray-800 font-medium text-left whitespace-nowrap">Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {dashboardData.bookings.map((item, index) => (
              <tr key={index} className="even:bg-gray-50">
                <td className="py-3 px-4 text-gray-800 whitespace-nowrap">{item.user.username}</td>
                <td className="py-3 px-4 text-gray-800 whitespace-nowrap">{item.room.roomType}</td>
                <td className="py-3 px-4 text-gray-800 whitespace-nowrap">₹{item.totalPrice}</td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap
=======
      <h2 className="text-xl text-blue-950/50 font-medium mb-5">Recent Bookings</h2>
      <div className="w-full max-w-5xl text-left border border-gray-300 rounded-lg max-h-[26rem] overflow-y-scroll overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-gray-800 font-medium">User Name</th>
              <th className="py-3 px-4 text-gray-800 font-medium">Room Name</th>
              <th className="py-3 px-4 text-gray-800 font-medium">Total Amount</th>
              <th className="py-3 px-4 text-gray-800 font-medium">Payment Status</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {dashboardData.bookings.map((item, index) => (
              <tr key={index} className="even:bg-gray-50">
                <td className="py-3 px-4 text-gray-800">{item.user.username}</td>
                <td className="py-3 px-4 text-gray-800">{item.room.roomType}</td>
                <td className="py-3 px-4 text-gray-800">₹{item.totalPrice}</td>
                <td className="py-3 px-4">
                  <button
                    className={`px-3 py-1 rounded-full text-xs font-semibold
>>>>>>> a306ffc3d39097587de5a3f717cc08727c072888
                      ${item.status === 'completed'
                        ? 'bg-green-100 text-green-700'
                        : item.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-700'
<<<<<<< HEAD
                        : 'bg-red-100 text-red-700'}`}
                  >
                    {item.status}
                  </span>
=======
                        : 'bg-red-100 text-red-700'}
                    `}
                  >
                    {item.status}
                  </button>
>>>>>>> a306ffc3d39097587de5a3f717cc08727c072888
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
