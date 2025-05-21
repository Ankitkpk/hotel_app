import React, { useContext, useState } from 'react';
import { assets, cities } from '../assets/assets';
import { AppContext } from '../context/appContext';
import { toast } from 'react-hot-toast';
const HotelReg = () => {
  const { setShowHotelReg,axios,getToken,setIsOwner } = useContext(AppContext);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [city, setCity] = useState("");


 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const token = await getToken();
    const { data } = await axios.post(
      `/api/hotels/registerHotel`,
      { name, address, contact, city },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (data.success) {
      toast.success(data.message || "Hotel registered successfully!");
      setIsOwner(true);
      setShowHotelReg(false);
    } else {
      toast.error(data.message || "Something went wrong!");
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error.message || "Registration failed!");
  }
};


  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/70 z-50">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden relative w-full max-w-4xl"
      >
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
            onClick={() => setShowHotelReg(false)}
          />

          {/* Heading */}
          <p className="text-2xl font-semibold mb-6">Register your hotel</p>

          {/* Form Fields */}
          <input
            type="text"
            placeholder="Hotel Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="tel"
            placeholder="Contact Number"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
            pattern="[0-9]{10}"
            title="Enter a 10-digit phone number"
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
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Select a city
              </option>
              {cities.map((cityName, index) => (
                <option key={index} value={cityName}>
                  {cityName}
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
