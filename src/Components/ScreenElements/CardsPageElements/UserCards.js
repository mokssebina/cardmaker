import React from 'react'

//////////////---Material UI imports---///////////////
import { Tooltip } from '@mui/material';

//////////////---Icon imports---////////////////////
import { OpenInNewOutlined, AttachMoneyOutlined, Close } from '@mui/icons-material';

//////////////---Screen imports---////////////////////
import UserCardPreview from './UserCardPreview';



const UserCards = ({ cardTitle, font, cardName, bgImage, lightColor, darkColor, introText, img, paid, openCard }) => {

    return (
        <div className='relative w-full h-auto aspect-video flex flex-col rounded-lg p-1'>
            
            <div id='preview' className='relative w-full h-auto aspect-video mb-1 rounded-lg border-2 border-gray-950'>
                <UserCardPreview cardTitle={cardTitle} font={font} bgImage={bgImage} lightColor={lightColor} darkColor={darkColor} introText={introText} img={img} />
            </div>
            
            <div id='buttons' className='w-full flex flex-row align-middle items-center'>
                {paid === "paid" &&
                    <div className='w-6 h-6 text-xs md:text-base md:w-10 md:h-10 md:py-2'>
                        <AttachMoneyOutlined className='md:text-base' />
                    </div>
                }
                <p className='text-sm md:text-base cursor-pointer'>{cardName}</p>

                <button type='button' onClick={openCard} className='w-6 h-6 text-xs md:text-base md:w-10 md:h-10 lg:w-10 lg:h-10 ml-auto rounded-lg hover:border-2 border-gray-900 cursor-pointer'>
                    <OpenInNewOutlined className='text-xs md:text-base' />
                </button>
            </div>
        </div>
    )
}

export default UserCards