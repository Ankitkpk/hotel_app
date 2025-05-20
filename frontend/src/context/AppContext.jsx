import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import React, { createContext, useState } from "react";
import { useUser, useAuth } from '@clerk/clerk-react';
axios.defaults.baseURL=import.meta.env.VITE_BACKEND_URL;
import {toast} from 'react-hot-toast'

export const AppContext = createContext();

const AppContextProvider = ({children}) => {
 const currency=import.meta.env.VITE_CURRENCY;
 const navigate=useNavigate();
 const {user}=useUser();
 const {getToken}=useAuth();
 const [isOwner ,setIsQwner]=useState(false);
 const [showHotelReg , setShowHotelReg]=useState(false);
 const [searchedCities,SetSearchedCities]=useState([]);
//create functions to setUsers//

const fetchUser = async () => {
  try {
    const token = await getToken();
    const { data } = await axios.get('/api/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if(data.success === true){
        setIsQwner(data.role === 'hotelOwner')
    }else{
        setTimeout(()=>{
            fetchUser
        },5000)
    }
  } catch (error) {
    toast.error(error.message);
  }
};

  const value = {
    currency,navigate,user,getToken,isOwner,setIsQwner,showHotelReg,setShowHotelReg,axios
  };

 return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;

