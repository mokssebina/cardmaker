import React from 'react'
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import { light } from '@mui/material/styles/createPalette'



const PreviewHeader = ({ day, setDay, cardTitle, headerLight, headerDark, lightColor, darkColor, font, template }) => {
    return (
        <div style={{backgroundColor: template === 'dayNight' ? `${day ? headerLight : headerDark}` : 'transparent'}} className={`absolute w-2/5 ml-[30%] h-14 z-10 top-4 flex flex-row ${day ? `border-[#283038]` : `border-[#cee5f0]`} border py-2 rounded-lg`}>
            
            <div className={`relative header-logo w-3/5 ml-[20%] h-full py-1 mx auto items-center text-center`}>
                <p style={{color: day? `${darkColor}` : `${lightColor}`, fontFamily: `${font}`}} className={`relative text-2xl`}>{cardTitle}</p>
            </div>

            <button style={{borderColor: day? darkColor : lightColor}} onClick={setDay} className={`absolute w-10 h-10 hover:border rounded-md cursor-pointer p-3 right-2`}>
                {day ?
                    <MoonIcon color={day? darkColor : lightColor} fontSize={16} />
                    :
                    <SunIcon color={day? darkColor : lightColor} fontSize={16} />
                }
            </button>
            
        </div>
    )
}

export default PreviewHeader