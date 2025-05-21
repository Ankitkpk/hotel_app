import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import React, { createContext, useState } from "react";
import { useUser, useAuth } from '@clerk/clerk-react';
axios.defaults.baseURL=import.meta.env.VITE_BACKEND_URL;
import {toast} from 'react-hot-toast'
import { useEffect } from 'react';

export const AppContext = createContext();

 const AppContextProvider = ({children}) => {
 const currency=import.meta.env.VITE_CURRENCY;
 const navigate=useNavigate();
 const {user}=useUser();
 const {getToken}=useAuth();
 const [isOwner, setIsOwner] = useState(false);
 const [showHotelReg , setShowHotelReg]=useState(false);
 const [searchedCities,SetSearchedCities]=useState([]);
//create functions to setUsers//

const fetchUser = async () => {
  try {

    const { data } = await axios.get('/api/user/getUser', {
      headers: {
        Authorization: `Bearer ${await  getToken()}`,
      },
    });
    if(data.success === true){
        setIsQwner(data.role === 'hotelOwner');
        SetSearchedCities(data.recentSearchedCities);
    }else{
        setTimeout(()=>{
            fetchUser
        },5000)
    }
  } catch (error) {
    toast.error(error.message);
  }
};

 useEffect(()=>{
    if(user){
        fetchUser();
    }
 },[user])
  const value = {
    currency,navigate,user,getToken,isOwner,setIsOwner,showHotelReg,setShowHotelReg,axios,searchedCities,SetSearchedCities
  };

 return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;

