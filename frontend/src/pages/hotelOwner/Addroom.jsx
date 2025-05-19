import React, { useState } from 'react';
import Title from '../../components/Title';
import { assets } from '../../assets/assets';

const Addroom = () => {
  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
  });

  const [inputs, setInputs] = useState({
    roomType: '',
    pricePerNight: 0,
    amenities: {
      'Free WiFi': false,
      'Free Breakfast': false,
      'Room Service': false,
      'Mountain View': false,
      'Pool Access': false,
    },
  });

  const handleImageChange = (e, key) => {
    const file = e.target.files[0];
    if (file) {
      setImages((prev) => ({
        ...prev,
        [key]: file,
      }));
    }
  };

  const handleAmenityChange = (e, amenity) => {
    setInputs((prev) => ({
      ...prev,
      amenities: {
        ...prev.amenities,
        [amenity]: e.target.checked,
      },
    }));
  };

  return (
    <form className="px-4 sm:px-6 lg:px-8 py-6">
      <Title
        align="left"
        font="outfit"
        title="Add Room"
        subtitle="Fill in the details carefully and add hotel booking details and pricing to enhance the user booking experience."
      />

      {/* Images */}
      <p className="text-gray-800 mt-10">Images</p>
      <div className="grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap">
        {Object.keys(images).map((key) => (
          <label htmlFor={`roomImage-${key}`} key={key} className="cursor-pointer">
            <img
              src={images[key] ? URL.createObjectURL(images[key]) : assets.uploadArea}
              alt={`room-${key}`}
              className="w-32 h-32 object-cover border rounded-md"
            />
            <input
              type="file"
              id={`roomImage-${key}`}
              className="hidden"
              accept="image/*"
              onChange={(e) => handleImageChange(e, key)}
            />
          </label>
        ))}
      </div>

      {/* Room Type & Price */}
      <div className="w-full flex max-sm:flex-col sm:gap-4 mt-4">
        <div className="flex-1 max-w-48">
          <p className="text-gray-800 mt-4">Room Type</p>
          <select
            name="roomType"
            id="roomType"
            className="border opacity-70 border-gray-300 mt-1 rounded p-2 w-full"
            value={inputs.roomType}
            onChange={(e) => setInputs((prev) => ({ ...prev, roomType: e.target.value }))}
          >
            <option value="">Select room type</option>
            <option value="Single Bed">Single Bed</option>
            <option value="Double Bed">Double Bed</option>
            <option value="Luxury Room">Luxury Room</option>
            <option value="Family Suite">Family Suite</option>
          </select>
        </div>
        <div>
          <p className="text-gray-800 mt-4">Price <span>/night</span></p>
          <input
            type="number"
            placeholder="0"
            className="border border-gray-300 mt-1 rounded p-2 w-24"
            value={inputs.pricePerNight}
            onChange={(e) =>
              setInputs((prev) => ({
                ...prev,
                pricePerNight: parseFloat(e.target.value),
              }))
            }
          />
        </div>
      </div>

      {/* Amenities */}
      <p className="text-gray-800 mt-4">Amenities</p>
      <div className="flex flex-col flex-wrap mt-1 text-gray-600 max-w-sm">
        {Object.keys(inputs.amenities).map((amenity) => (
          <label key={amenity} className="flex items-center gap-2 my-1">
            <input
              type="checkbox"
              checked={inputs.amenities[amenity]}
              onChange={(e) => handleAmenityChange(e, amenity)}
            />
            {amenity}
          </label>
        ))}
      </div>
      <button className='bg-blue-600 text-white px-8 py-4 rounded mt-6'>
       Add Room
      </button>
    </form>
  );
};

export default Addroom;
