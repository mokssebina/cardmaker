import React from 'react'

const UserCardPreview = ({ cardTitle, bgImage, font, lightColor, darkColor, introText, img }) => {
    return (
        <div style={{ backgroundColor: `${lightColor}` }} className='w-full h-full rounded-lg'>
            {bgImage && <img className='w-full h-full bg-contain rounded-md' src={bgImage} />}
            <div className='absolute z-10 top-0 w-full h-full flex flex-col'>
                <div className="relative w-full h-1/4 px-2">
                    <div className='w-full h-1/2 pt-2'>
                        <div className='w-1/3 h-3 mx-auto py-[2px] border border-gray-950 rounded-[3px] items-center text-center'>
                            <p style={{fontFamily: `${font}`}} className='text-[4px]'>{cardTitle}</p>
                        </div>
                    </div>
                    <div className='relative w-full h-1/2 py-1'>
                    <div className='relative w-2/5 mx-auto h-full p-[2px]'>
                    <p style={{ color: `${darkColor}` }} className='relative text-[4px]'>{introText}</p>
                    </div>
                    </div>
                </div>
                <div className="relative w-full h-3/4 px-2">
                    <div className='relative w-2/5 mx-auto aspect-square'>
                        {img && <img className='w-full h-full bg-contain' src={img} />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCardPreview