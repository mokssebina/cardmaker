import React, {useEffect} from 'react'
import { Link, useLocation } from 'react-router-dom'



const NavButton = ({ path, icon, title }) => {

    const location  = useLocation()

    //console.log('location: ',location.pathname)
    //console.log('path: ', path)

    useEffect(() => {
        if(location.pathname === path){
            console.log('matches')
        }
    },[location, path])

    return (
        <Link to={path}>
            <div className={`w-full h-12 px-10 mb-1 py-3 flex flex-row space-x-4 rounded-lg cursor-pointer ${location.pathname === path && 'bg-gray-800 hover:bg-gray-800'} text-white hover:bg-gray-900`}>
                {icon}
                <p>{title}</p>
            </div>
        </Link>
    )
}

export default NavButton