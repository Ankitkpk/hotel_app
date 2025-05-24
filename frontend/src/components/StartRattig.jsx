import React from 'react'
import { assets } from '../assets/assets'

const StartRattig = ({rating=4}) => {
  return (
    <div className='flex gap-2'>
    {Array(5).fill('').map((_, index) => (
     <img key={index} src={rating > index ? assets.starIconFilled :assets.starIconOutlined} alt="" className='w-4.5 h-4.5' />
    ))}
    </div>
  )
}

export default StartRattig