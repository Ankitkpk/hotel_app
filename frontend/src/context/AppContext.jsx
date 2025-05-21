import React, { createContext, useState, useEffect } from 'react';
import { useUser, useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();
  const { user } = useUser();
  const { getToken } = useAuth();

  const [isOwner, setIsOwner] = useState(false);
  const [showHotelReg, setShowHotelReg] = useState(false);
  const [searchedCities, SetSearchedCities] = useState([]);

  const syncUser = async () => {
    if (!user) return;

    const token = await getToken();

    const userData = {
      _id: user.id,
      email: user.emailAddresses[0]?.emailAddress,
      username: `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim(),
      image: user.imageUrl,
    };

    try {
      await axios.post('/api/user/sync', userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('✅ User synced to DB');
    } catch (error) {
      console.error('❌ Error syncing user:', error.message);
    }
  };

  const fetchUser = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get('/api/user/getUser', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success === true) {
        setIsOwner(data.role === 'hotelOwner');
        SetSearchedCities(data.recentSearchedCities);
      } else {
        setTimeout(() => {
          fetchUser();
        }, 5000);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const handleUserSetup = async () => {
      if (user) {
        await syncUser();     
        await fetchUser();   
      }
    };

    handleUserSetup();
  }, [user]);

  const value = {
    currency,
    navigate,
    user,
    getToken,
    isOwner,
    setIsOwner,
    showHotelReg,
    setShowHotelReg,
    axios,
    searchedCities,
    SetSearchedCities,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
