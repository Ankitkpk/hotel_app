import React from 'react';
import { assets, cities } from '../assets/assets';

const HotelReg = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/70 z-50">
      <form className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden relative w-full max-w-4xl">
        {/* Left Side Image */}
        <img
          src={assets.regImage}
          alt="Registration"
          className="w-1/2 hidden md:block object-cover"
        />

        {/* Right Side Form */}
        <div className="flex flex-col p-6 md:p-10 w-full md:w-1/2 relative">
          {/* Close Button */}
          <img
            src={assets.closeIcon}
            alt="close"
            className="absolute top-4 right-4 h-5 w-5 cursor-pointer"
          />

          {/* Heading */}
          <p className="text-2xl font-semibold mb-6">Register your hotel</p>

          {/* Form Fields */}
          <input
            type="text"
            placeholder="Hotel Name"
            className="border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Address"
            className="border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* City Dropdown */}
          <div className="mb-4">
            <label htmlFor="city" className="font-medium text-gray-500 mb-2 block">
              City
            </label>
            <select
              id="city"
              name="city"
              className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled selected>
                Select a city
              </option>
              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition cursor-pointer"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default HotelReg;
