import React from 'react'
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'



const CardHeader = ({ day, setDay, cardTitle, headerLight, headerDark, lightColor, darkColor, font }) => {
    return (
        <div style={{backgroundColor: `${day ? headerLight : headerDark}`}} className={`relative w-2/5 ml-[30%] h-14 top-4 flex flex-row ${day ? `border-[#283038]` : `border-[#cee5f0]`} border py-2 rounded-lg`}>
            
            <div className={`relative header-logo w-3/5 ml-[20%] h-full py-1 mx auto items-center text-center`}>
                <p style={{color:day? `${darkColor}` : `${lightColor}`, fontFamily: `${font}`}} className={`relative text-2xl`}>{cardTitle}</p>
            </div>

            <button onClick={setDay} className={`absolute w-10 h-10 ${day ? `hover:border hover:border-gray-950 text-gray-950` : `hover:border hover:border-gray-50 text-gray-50`} rounded-md cursor-pointer p-3 right-2`}>
                {day ?
                    <MoonIcon fontSize={16} />
                    :
                    <SunIcon fontSize={16} />
                }
            </button>
            
        </div>
    )
}

export default CardHeader