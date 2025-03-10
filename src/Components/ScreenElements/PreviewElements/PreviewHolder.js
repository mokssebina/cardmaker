//////////////---React imports---////////////////////
import React from 'react'

//////////////---Preview elements imports---////////////////////
import PreviewHeader from './PreviewHeader'

//////////////---Messages imports---////////////////////
import MessageItem from '../MessagePage/Messages/MessageItem'
import Footer from './Footer'




const PreviewHolder = ({ template, bgImage, day, setDay, light, dark, bgLightColor, bgDarkColor, lightTextColor, darkTextColor, cardTitle, defaultLayout, headerLight, headerDark, coverImage, introText, birthdayMessage, font, messages }) => {
    return (
        <div style={{ backgroundColor: `${day ? bgLightColor : bgDarkColor}` }} className='relative w-11/12 h-auto aspect-video rounded-lg border border-gray-950 overflow-scroll'>

            {/*Cover page*/}

            <div className={`relative w-full h-full`}>

                {bgImage && <img className="relative w-full h-full object-cover" src={`${day ? light : dark}`} />}

                <div className="absolute z-10 top-0 w-full h-full flex flex-col">

                    <div className="relative w-full h-[25%] pt-2 px-2">

                        <PreviewHeader template={template} day={day} setDay={setDay} cardTitle={cardTitle} headerLight={headerLight} headerDark={headerDark} lightColor={lightTextColor} darkColor={darkTextColor} font={font} />

                        <div className={`relative w-2/5 h-14 mx-auto border border-dashed rounded-lg p-2 ${day ? `border-[#283038]` : `border-[#cee5f0]`}`}>
                            <p style={{ color: day ? `${darkTextColor}` : `${lightTextColor}` }} className='relative text-xs'>{introText}</p>
                        </div>

                    </div>

                    <div className="relative w-full h-[75%] pb-1">

                        <div className={`absolute bottom-0 w-2/5 ml-[30%] border border-dashed rounded-lg ${day ? 'border-[#283038]' : 'border-[#cee5f0]'}`}>

                            <div className='relative w-full aspect-square'>
                                {coverImage && <img className="w-full h-full object-contain" src={`${coverImage}`} />}
                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/*Second page*/}

            <div style={{ backgroundColor: `${day ? bgLightColor : bgDarkColor}` }} className={`relative w-full auto pt-20 pb-20 flex flex-col`}>

                <div className={`relative w-3/5 h-52 ml-[20%] flex flex-col`}>

                    <div className={`relative w-full h-48 p-2 border border-dashed rounded-lg ${day ? `text-[${darkTextColor}] border-[#283038]` : `text-[${lightTextColor}] border-[#cee5f0]`}`}>
                        <p className='relative text-base'>{birthdayMessage}</p>
                    </div>

                </div>

                {messages &&
                    <div className={`w-3/5 h-auto mt-9 ml-[20%] relative grid grid-flow-row-dense grid-cols-2 md:grid-cols-3 border border-dashed rounded-lg ${day ? `text-[${darkTextColor}] border-[#283038]` : `text-[${lightTextColor}] border-[#cee5f0]`}`}>

                        {messages?.map((item) => (
                            <MessageItem openModal={() => { }} key={item.id} message={item.message} name={item.first_name} day={day} darkTextColor={darkTextColor} lightTextColor={lightTextColor} />
                        ))}

                    </div>}

            </div>

            {/* Footer */}
            <Footer day={day} cardTitle={cardTitle} lightColor={lightTextColor} darkColor={darkTextColor} font={font}
                footerLight={bgLightColor} footerDark={bgDarkColor} darkTextColor={darkTextColor} lightTextColor={lightTextColor}
            />

        </div>
    )
}

export default PreviewHolder