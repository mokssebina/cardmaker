import React from 'react'

const Footer = ({day, darkColor, lightColor, font, cardTitle, footerLight, footerDark}) => {
  return (
    <div style={{backgroundColor: `${day ? footerLight : footerDark}`}} className={`w-full h-44`}>

      <div className={`relative w-11/12 md:w-4/5 lg:w-3/5 h-full mx-auto flex flex-col border-t ${day ? 'border-gray-900' : 'border-gray-50'}`}>

        <div className={`header-logo absolute w-full md:w-1/3 md:left-1/3 h-14 ${day ? 'text-gray-900' : 'text-gray-50'} bottom-5 py-1 mx-auto items-center text-center`}>
          <p style={{color: day? `${darkColor}` : `${lightColor}`, fontFamily: `${font}`}} className='relative text-base'>{cardTitle}</p>
        </div>

      </div>

    </div>
  )
}

export default Footer
