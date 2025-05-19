import React from 'react'
import Navbar from './Navbar' 
import SideBar from './SideBar'
import { Outlet } from 'react-router'

const Layout = () => {
  return (
    <div className='flex flex-col h-screen'>
      <Navbar/>
      <div className='flex '>
        <SideBar/>
        <div className='flex-1 gap-y-4'>
          <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default Layout