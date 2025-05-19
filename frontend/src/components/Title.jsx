import React from 'react'

const Title = ({ title, subtitle, align, font }) => {
  return (
    <div className={`flex flex-col justify-center text-center ${align === "left" ? "md:items-start md:text-left" : "items-center"}`}>
      <h1 className={`text-4xl md:text-[40px] ${font ? font : "font-playfair"}`}>{title}</h1>
      <p className='text-sm md:text-base text-gray-500/90 mt-2 max-w-2xl'>{subtitle}</p> 
    </div>
  )
}

export default Title
