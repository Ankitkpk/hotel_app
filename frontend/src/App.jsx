import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Footer from './components/Footer.jsx';
import Allrooms from './pages/Allrooms.jsx';
import RoomDetails from './pages/RoomDetails.jsx';
import Mybookings from './pages/Mybookings.jsx';
import HotelReg from './components/HotelReg.jsx';
import Layout from './pages/hotelOwner/Layout.jsx';
import Dashboard from './pages/hotelOwner/Dashboard.jsx';
import ListRoom from './pages/hotelOwner/ListRoom.jsx';
import Addroom from './pages/hotelOwner/Addroom.jsx';

function AppContent() {
  const location = useLocation();
  const isOwnerPath = location.pathname.includes('owner');

  return (
    <>
      {!isOwnerPath && <Navbar />}
       {false &&<HotelReg/>}
      <div className='min-h-[70vh]'>
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/rooms" element={<Allrooms/>} />
      <Route path="/rooms/:id" element={<RoomDetails/>}/>
      <Route path="/my-booking" element={<Mybookings/>}  />
      <Route path="/owner" element={<Layout/>}>
     <Route index element={<Dashboard/>} />
     <Route path="add-room" element={<Addroom/>}/>
     <Route path="list-room" element={<ListRoom/>} />
     </Route>
      </Routes>
      <Footer/>
      </div>
      
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
