import React, { useState, useEffect, useContext, Fragment } from 'react'

//////////////---Navigation imports---////////////////////
import { useLocation } from 'react-router-dom';

//////////////---Animation imports---////////////////////
import { motion } from "framer-motion";

//////////////---Screen imports---////////////////////
import Sidebar from './Sidebar';
import Header from './Header';

//////////////---Context imports---////////////////////
import { useAuth } from '../../Context/AuthContext';



const Layout = ({ children }) => {

    const location = useLocation()
    const [showNav, setShowNav] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const { preview, togglePreview } = useAuth()


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

            <div className='w-screen h-screen flex flex-row bg-white overscroll-none'>

                {/*preview &&
                    <div className='relative w-screen h-screen bg-white overscroll-none z-30'>
                        {children}
                        <button onClick={() => togglePreview()} type='submit' className="fixed right-8 bottom-8 w-32 h-12 rounded bg-gray-950 py-2 px-4 text-sm mt-14 z-10 text-white data-[hover]:bg-gray-800">
                            ← Back
                        </button>
                    </div>
                */}

                {!preview && <Sidebar />}

                <main className={`${preview ? 'w-full' : 'xl:w-4/5'} h-full`}>

                    {!preview && <Header />}

                    <div className={`${preview ? 'w-full h-full' : 'w-full h-content px-2 pb-5 overflow-scroll'}`}>{children}</div>

                    {preview &&
                        <button onClick={() => togglePreview()} type='submit' className="fixed right-8 bottom-8 w-32 h-12 rounded bg-gray-950 py-2 px-4 text-sm mt-14 z-10 text-white data-[hover]:bg-gray-800">
                            ← Back
                        </button>
                    }
                </main>

            </div>

        </motion.div>
    )
}

export default Layout