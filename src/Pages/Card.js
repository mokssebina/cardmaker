import React from 'react'
import CardHeader from '../Components/ScreenElements/PreviewElements/CardHeader'
import Footer from '../Components/ScreenElements/PreviewElements/Footer'

const Card = ({
    day, setDay, bgImage, cardTitle, headerLight, headerDark, lightColor, darkColor, font, bgLightColor,
    bgDarkColor, birthdayMessage, /*defaultLayout,*/ coverImage, darkTextColor, lightTextColor, light, dark,
    introText
}) => {

    const defaultLayout = true

    return (
        <div className='w-screen h-screen overflow-scroll overscroll-none'>

            {/*Cover page*/}

            <div style={{ backgroundColor: `${day ? bgLightColor : bgDarkColor}` }} className={`relative w-full h-full`}>

                <CardHeader day={day} setDay={setDay} cardTitle={cardTitle} headerLight={headerLight} headerDark={headerDark} lightColor={lightTextColor} darkColor={darkTextColor} font={font} />

                {bgImage && <img className="relative w-full h-full object-cover" src={`${day ? light : dark}`} />}

                <div className={`absolute bottom-0 w-2/5 h-5/6 ml-[30%] flex flex-col`}>

                    {defaultLayout ?
                        <>
                            <div className={`relative w-full h-1/4 p-2`}>
                                <p style={{ color: day ? `${darkTextColor}` : `${lightTextColor}` }} className='relative text-base'>{introText}</p>
                            </div>

                            <div className='relative w-full aspect-square'>
                                {coverImage && <img className="w-full h-full object-contain" src={`${coverImage}`} />}
                            </div>
                        </>
                        :
                        <>
                            <div className={`relative w-full aspect-square`}>
                                {coverImage && <img className="w-full h-full object-contain" src={`${coverImage}`} />}
                            </div>

                            <div className={`relative w-full h-1/4 p-2`}>
                                <p style={{ color: day ? `${darkTextColor}` : `${lightTextColor}` }} className='relative text-base'>{introText}</p>
                            </div>
                        </>
                    }


                </div>

            </div>

            {/*Second page*/}

            <div style={{ backgroundColor: `${day ? bgLightColor : bgDarkColor}` }} className={`relative w-full h-auto pt-20 pb-8 flex flex-col`}>

                <div className={`relative w-3/5 h-64 ml-[20%] flex flex-col`}>

                    <div className={`relative w-full h-48 p-2 rounded-lg ${day ? `text-[${darkTextColor}]` : `text-[${lightTextColor}]`}`}>
                        <p className='relative text-base'>{birthdayMessage}</p>
                    </div>

                </div>

            </div>

            {/*Footer*/}

            <Footer day={day} />

        </div>
    )
}

export default Card