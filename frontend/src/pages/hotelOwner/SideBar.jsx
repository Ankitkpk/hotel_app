import React from 'react'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const SideBar = () => {
  const sidebarLinks = [
    { name: "Dashboard", path: "/owner", icon: assets.dashboardIcon },
    { name: "Add Room", path: "/owner/add-room", icon: assets.addIcon },
    { name: "List Room", path: "/owner/list-room", icon: assets.listIcon }
  ]

  return (
    <div className='md:w-64 w-16 border-r h-full text-base border-gray-300 pt-4 flex flex-col transition-all duration-300'>
      {sidebarLinks.map((item, index) => (
        <NavLink
          to={item.path}
          key={index}
          end
          className={({ isActive }) =>
            `flex items-center py-4 px-4 gap-4 transition-colors duration-200 
            ${isActive ? 'bg-gray-200 font-semibold text-gray-900' : 'text-gray-600 hover:bg-gray-100'}`
          }
        >
          <img src={item.icon} alt={item.name} className="w-6 h-6" />
          <span className='hidden md:inline'>{item.name}</span>
        </NavLink>
      ))}
    </div>
  )
}

export default SideBar
