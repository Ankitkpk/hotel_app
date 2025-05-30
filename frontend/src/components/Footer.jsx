import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div className='text-gray-500/80 pt-6 px-4 sm:px-6 md:px-16 lg:px-24 xl:px-32 mt-16 bg-slate-100'>
      <div className='flex flex-wrap justify-between gap-10 sm:gap-12 md:gap-6'>
        <div className='max-w-80'>
          <img src={assets.logo} alt="logo" className='mb-3 h-7 sm:h-8 md:h-9 invert opacity-80' />
          <p className='text-sm leading-relaxed'>
            Discover most Extraordinary Hotels to stay from Boutique hotels to luxury villas and private hotels
          </p>
          <div className='flex items-center gap-3 mt-3'>
            <img src={assets.instagramIcon} alt="instagram" className='w-5 sm:w-6' />
            <img src={assets.facebookIcon} alt="facebook" className='w-5 sm:w-6' />
            <img src={assets.twitterIcon} alt="twitter" className='w-5 sm:w-6' />
            <img src={assets.linkendinIcon} alt="linkedin" className='w-5 sm:w-6' />
          </div>
        </div>

        <div>
          <p className='font-playfair text-gray-800'>COMPANY</p>
          <ul className='mt-2 sm:mt-3 flex flex-col gap-1.5 text-sm'>
            <li><a href="#">About</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Press</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Partners</a></li>
          </ul>
        </div>

        <div>
          <p className='font-playfair text-gray-800'>SUPPORT</p>
          <ul className='mt-2 sm:mt-3 flex flex-col gap-1.5 text-sm'>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Safety Information</a></li>
            <li><a href="#">Cancellation Options</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Accessibility</a></li>
          </ul>
        </div>

        <div className='max-w-80'>
          <p className='font-playfair text-gray-800'>STAY UPDATED</p>
          <p className='mt-2 sm:mt-3 text-sm leading-relaxed'>
            Subscribe to our newsletter for inspiration and special offers.
          </p>
          <div className='flex items-center mt-3'>
            <input
              type="text"
              className='bg-white rounded-l border border-gray-300 h-8 px-2 outline-none text-sm w-full max-w-[160px]'
              placeholder='Your email'
            />
            <button className='flex items-center justify-center bg-black h-8 w-8 aspect-square rounded-r'>
              <img src={assets.arrowIcon} alt="arrow" className='w-3 invert' />
            </button>
          </div>
        </div>
      </div>

      <hr className='border-gray-300 mt-6' />

      <div className='flex flex-col md:flex-row gap-2 items-center justify-between py-4'>
        <p className='text-sm'>© {new Date().getFullYear()} Brand. All rights reserved.</p>
        <ul className='flex items-center gap-3 text-sm'>
          <li><a href="#">Privacy</a></li>
          <li><a href="#">Terms</a></li>
          <li><a href="#">Sitemap</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
