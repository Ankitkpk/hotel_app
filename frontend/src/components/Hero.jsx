import React, { useContext, useState } from 'react';
import { assets, cities } from '../assets/assets';
import { AppContext } from '../context/appContext';

const Hero = () => {
  const { navigate, getToken, axios, SetSearchedCities } = useContext(AppContext);
  const [destination, SetDestination] = useState("");
  

  const search = async (e) => {
    e.preventDefault(); 

    navigate(`/rooms?destination=${destination}`);

    // Call API to save searched cities
    const token = await getToken();

    await axios.post(
      `/api/user/SetSearchedCities`,
      { recentSearchedCity: destination },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Add destination to searched cities, max 3 recent
    SetSearchedCities((previousCities) => {
      // Remove duplicates if any
      const filteredCities = previousCities.filter(city => city !== destination);
      const updatedSearchCities = [...filteredCities, destination];
      if (updatedSearchCities.length > 3) {
        updatedSearchCities.shift();
      }
      return updatedSearchCities;
    });
  };

  return (
    <div
      className="flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-24 xl:px-32 text-white
        bg-[url('/src/assets/heroImage.png')] bg-no-repeat bg-cover bg-center h-screen"
    >
      <p className="bg-[#49B9FF]/50 px-3.5 py-1 rounded-full mt-20">
        The Ultimate Hotel destination
      </p>

      <h1 className="font-playfair text-2xl md:text-5xl font-extrabold max-w-xl">
        Discover your perfect gateway destination
      </h1>

      <p className="max-w-130 mt-2 text-sm md:text-base">
        Unparalleled luxury and comfort await at the world's most exclusive <br /> hotels and resorts.
        Start your journey today.
      </p>

      <form
        onSubmit={search}
        className="bg-white text-gray-500 rounded-lg px-6 py-4 flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto mt-7"
      >
        <div>
          <div className="flex items-center gap-2">
            <img src={assets.calenderIcon} className="h-4" alt="" />
            <label htmlFor="destinationInput">Destination</label>
          </div>
          <input
            onChange={(e) => SetDestination(e.target.value)}
            id="destinationInput"
            value={destination}
            type="text"
            list="destinations"
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
            placeholder="Type here"
            required
          />
          <datalist id="destinations">
            {cities.map((city, index) => (
              <option value={city} key={index} />
            ))}
          </datalist>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <img src={assets.calenderIcon} className="h-4" alt="" />
            <label htmlFor="checkIn">Check in</label>
          </div>
          <input
            id="checkIn"
            type="date"
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
          />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <img src={assets.calenderIcon} className="h-4" alt="" />
            <label htmlFor="checkOut">Check out</label>
          </div>
          <input
            id="checkOut"
            type="date"
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
          />
        </div>

        <div className="flex md:flex-col max-md:gap-2 max-md:items-center">
          <label htmlFor="guests">Guests</label>
          <input
            min={1}
            max={4}
            id="guests"
            type="number"
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none max-w-16"
            placeholder="0"
          />
        </div>

        <button
          type="submit"
          className="flex items-center justify-center gap-1 rounded-md bg-black py-3 px-4 text-white my-auto cursor-pointer max-md:w-full max-md:py-1"
        >
          <img src={assets.searchIcon} alt="searchIcon" className="h-7" />
          <span>Search</span>
        </button>
      </form>
    </div>
  );
};

export default Hero;
