import React from 'react'
import { useLocation } from 'react-router-dom'
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline'
import NavButton from './NavButton'
import { navRoutes } from './appRoutes'
import { useAuth } from '../../Context/AuthContext'



const Sidebar = () => {

    const location = useLocation()
    const { signOut } = useAuth()

    return (
        <div className='w-1/5 h-full p-5'>
            <div className='w-full h-full rounded-lg p-2 bg-gray-950 border-2 flex flex-col space-y-1'>

                <div className='relative top-0 w-full h-16 mb-8'></div>

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
        </div>
    )
}

export default Sidebar