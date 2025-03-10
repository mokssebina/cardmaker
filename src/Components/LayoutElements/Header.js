import React from 'react'
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'



const Header = () => {
  return (
    <div className='w-full h-24 flex flex-row px-2'>
      <div className='absolute w-24 h-24 p-5 right-5'>
        {/*
          <button className='w-10 h-10 p-2 cursor-pointer border border-gray-950 rounded-lg animate-bounce hover:animate-none'>
            <MoonIcon fontSize={24} />
          </button>
        */}
      </div>
      <div className='w-full border-b-2 mt-auto border-gray-950'></div>
    </div>
  )
}

export default Header