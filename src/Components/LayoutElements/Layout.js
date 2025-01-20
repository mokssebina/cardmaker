import React, { useState, useEffect, useContext, Fragment } from 'react'
import { Transition } from "@headlessui/react";
import { useLocation } from 'react-router-dom';
import { motion } from "framer-motion";
import Sidebar from './Sidebar';
import Header from './Header';



const Layout = ({ children }) => {

    const location = useLocation()
    const [showNav, setShowNav] = useState(false);
    const [isMobile, setIsMobile] = useState(false);


    return (
        <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
            }}
        >

            {location.pathname?.includes('preview') ?
                <div className='w-screen h-screen bg-white overscroll-none'>
                    {children}
                </div>
                :
                <>
                    <div className='w-screen h-screen flex flex-row bg-white overscroll-none'>

                        <Sidebar />

                        <main className={`${location.pathname?.includes('preview') ? 'w-full' : 'xl:w-4/5'} h-full`}>

                            <Header />

                            <div className='w-full h-content px-2 pb-5 overflow-scroll'>{children}</div>

                        </main>

                    </div>
                </>
            }

        </motion.div>
    )
}

export default Layout