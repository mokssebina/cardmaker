import React, { useState, useEffect } from 'react'

//////////////---Animation imports---////////////////////
import { motion } from "framer-motion";

//////////////---Navigation imports---////////////////////
import { useLocation } from 'react-router-dom'

//////////////---Icon imports---////////////////////
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline'
import CloseIcon from '@mui/icons-material/Close';

//////////////---Screen imports---////////////////////
import NavButton from './NavButton'

//////////////---Routes imports---////////////////////
import { navRoutes } from './appRoutes'

//////////////---Context imports---////////////////////
import { useAuth } from '../../Context/AuthContext'



const Sidebar = () => {

    const location = useLocation()
    const { device, signOut } = useAuth()
  
    return (
        <motion.div
            key="panel"
            initial={{ x: "-100%" }}  // Start off-screen (hidden)
            animate={{ x: "0%" }}    // Slide in
            exit={{ x: "-100%" }}      // Slide out
            transition={{ duration: 0.5, ease: "easeInOut" }} // Smooth transition
            //initial={{ x: "100%" }}
            //animate={{ x: openPay ? "0%" : "100%" }}
            //transition={{ type: "spring", stiffness: 80 }}
            className={`relative w-1/5 h-full p-5`}
        >
            <div className='w-full h-full rounded-[16px] p-2 bg-gray-950 border-2 flex flex-col space-y-1'>

                <div className='relative top-0 w-full h-16 flex flex-row mb-8'>

                    {/*
                    device !== 'Desktop' &&
                        <button onClick={setShowNav} className='h-10 w-10 ml-auto aspect-auto text-white'>
                            <CloseIcon />
                        </button>
                    */}

                </div>

                <div className='relative w-full h-content'>
                    {navRoutes.map((item) => (
                        <NavButton key={item.id} path={item.path} icon={item.icon} title={item.title} />
                    ))}
                </div>

                <button onClick={signOut} className='relative w-full h-12 px-10 py-3 rounded-lg cursor-pointer text-white hover:bg-gray-900'>
                    <div className='w-full h-full flex flex-row space-x-4'>
                        <ArrowRightStartOnRectangleIcon />
                        <p>Logout</p>
                    </div>
                </button>

            </div>

        </motion.div>
    )
}

export default Sidebar