import React from 'react';
import HotelCard from './HotelCard';
import Title from './Title';
<<<<<<< HEAD
import { useNavigate } from 'react-router';
=======
>>>>>>> a306ffc3d39097587de5a3f717cc08727c072888
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const FeatureDestination = () => {
<<<<<<< HEAD
  const {roomdata,navidate}=useContext(AppContext);
=======
  const {roomdata,navigate}=useContext(AppContext);
>>>>>>> a306ffc3d39097587de5a3f717cc08727c072888
  
  console.log(roomdata);

  return roomdata.length > 0 && (
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-25 bg-slate-100 py-20">
      <Title
        title="FeatureDestinations"
        subtitle="Discover our handpicked selection of exceptional properties around the world offering unparalleled and unforgettable experiences"
      />
      
      {/* Center hotel cards on small screens */}
      <div className="flex flex-wrap items-center justify-center md:justify-between gap-14 mt-20 mb-3">
        { roomdata.slice(0, 4).map((room, index) => (
          <HotelCard key={room._id} room={room} index={index} />
        )) }
      </div>

      <button
        onClick={() => {
          navigate('/rooms');
          scrollTo(0, 0);
        }}
        className="my-16 px-4 py-2 border text-sm font-medium border-gray-300 rounded bg-white hover:bg-gray-50 transition-all cursor-pointer"
      >
        View All destinations
      </button>
    </div>
  );
};

export default FeatureDestination;
