/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'
import { BiSearch ,  } from 'react-icons/bi';
import { CiSettings } from "react-icons/ci";


const Header = ({ query, setQuery }) => {
  const [userData] = useState(JSON.parse(localStorage.getItem("userInfo")) || "");

    if(!userData){
      return;
    }

  return (
    <div className='bg-black w-full'>
      <div className='header bg-[#FF742B] p-2 grid grid-cols-12 gap-4 items-center max-w-6xl m-auto'>
        <div className='left flex items-center col-span-2 gap-2'>
          <div className='logo '>
            <img
              className='size-10'
              src='https://hn.algolia.com/public/899d76bbc312122ee66aaaff7f933d13.png'
              alt='logo'
            />
          </div>
          <div className='userName m-0 leading-none text-md font-[400]'>
            {userData?.name
              .split(" ")
              .map((ch) => ch.charAt(0).toUpperCase() + ch.slice(1))
              .join(" ")}
          </div>
        </div>

        <div className='center bg-white col-span-9 items-center rounded-sm'>
          <div className='flex e py-2 px-3 items-center gap-2 justify-between'>
            <div className='flex flex-1 gap-4'>
              <BiSearch className='text-2xl ' fill='#FF742B' />
              <input
                type='text'
                className='w-full placeholder:text-[#757575] max-w-xl outline-none'
                placeholder='Search stories by title, url or author'
                onChange={(e) => setQuery(e.target.value)}
                value={query}
              />
            </div>

            <div className='md:flex gap-2 items-center hidden'>
              <p className='text-[11px] text-gray-400 font-[300]'>Search by</p>
              <img
                src='https://hn.algolia.com/public/38a9c67b12016b52267071c530ff2e78.svg'
                alt='algolia-logo'
                className='w-[80px]'
              />
            </div>
          </div>
        </div>

        <div className='right flex items-center col-span-1 text-3xl   justify-end'>
          <CiSettings className='font-bold' />
        </div>
      </div>
    </div>
  );
}

export default Header