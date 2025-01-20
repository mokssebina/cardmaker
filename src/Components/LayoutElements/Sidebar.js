import React from 'react'
import { useLocation } from 'react-router-dom'
import NavButton from './NavButton'
import { navRoutes } from './appRoutes'



const Sidebar = () => {

    const location = useLocation()

    return (
        <div className='w-1/5 h-full p-5'>
            <div className='w-full h-full rounded-lg p-2 bg-gray-950 border-2 flex flex-col space-y-1'>

                <div className='relative top-0 w-full h-16 mb-8'></div>

                {navRoutes.map((item) => (
                    <NavButton key={item.id} path={item.path} icon={item.icon} title={item.title} />
                ))}

            </div>
        </div>
    )
}

export default Sidebar