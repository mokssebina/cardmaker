import React, { useState, useEffect } from 'react';




const TemplateHolder = ({ bgImage, day, light, dark, lightColor, darkColor, selectTemplate }) => {


    return (
        <div style={{backgroundColor: `${day ? lightColor : darkColor}`}} onClick={selectTemplate} className={`inline-block w-40 h-auto aspect-video rounded-lg cursor-pointer border border-gray-950`}>

            {bgImage && <img className='w-full h-full bg-contain rounded-lg' src={`${day ? light : dark}`} />}

        </div>
    )
}

export default TemplateHolder