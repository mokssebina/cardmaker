import React from 'react'
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import { light } from '@mui/material/styles/createPalette'



const PreviewHeader = ({ day, setDay, cardTitle, headerLight, headerDark, lightColor, darkColor, font, template }) => {
    return (
        <div style={{backgroundColor: template === 'dayNight' ? `${day ? headerLight : headerDark}` : 'transparent'}} className={`relative w-2/5 ml-[30%] h-12 mb-2 flex flex-row ${day ? `border-[#283038]` : `border-[#cee5f0]`} border py-2 rounded-lg`}>
            
            <div className={`relative header-logo w-3/5 ml-[20%] h-full mx auto items-center text-center`}>
                <p style={{color: day? `${darkColor}` : `${lightColor}`, fontFamily: `${font}`}} className={`relative text-xl`}>{cardTitle}</p>
            </div>

            <button style={{borderColor: day? darkColor : lightColor}} onClick={setDay} className={`absolute w-9 h-9 hover:border rounded-md cursor-pointer p-3 right-[4px] bottom-[4px]`}>
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