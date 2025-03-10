import React, { useState, useEffect } from 'react';




const TemplateHolder = ({ bgImage, day, light, dark, lightColor, darkColor, selectTemplate, template }) => {


    return (
        <div onClick={selectTemplate} className={`inline-block w-40 h-auto p-1 aspect-video rounded-lg mr-2 cursor-pointer ${template && 'border-2 border-gray-950'}`}>

            <div style={{backgroundColor: `${day ? lightColor : darkColor}`}} className='w-full h-full rounded-md border border-gray-950'>
            {bgImage && <img className='w-full h-full bg-contain rounded-md' src={`${day ? light : dark}`} />}
            </div>

        </div>
    )
}

export default TemplateHolder