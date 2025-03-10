import React from 'react'

//////////////---Material UI imports---///////////////
import { Tooltip } from '@mui/material';

//////////////---Icon imports---////////////////////
import { OpenInNewOutlined, AttachMoneyOutlined, Close } from '@mui/icons-material';

//////////////---Screen imports---////////////////////
import UserCardPreview from './UserCardPreview';



const UserCards = ({ cardTitle, font, cardName, bgImage, lightColor, darkColor, introText, img, paid, openCard }) => {

    const print = () => { console.log("clicked!") }

    return (
        <div className='relative w-full h-auto aspect-video flex flex-col rounded-lg p-1'>
            
            <div id='preview' className='relative w-full h-auto aspect-video mb-1 rounded-lg border-2 border-gray-950'>
                <UserCardPreview cardTitle={cardTitle} font={font} bgImage={bgImage} lightColor={lightColor} darkColor={darkColor} introText={introText} img={img} />
            </div>
            
            <div id='buttons' className='w-full h-12 text-sm px-1 flex flex-row'>
                {paid === "paid" &&
                    <div className='w-10 h-10 py-2'>
                        <AttachMoneyOutlined />
                    </div>
                }
                <p className='mt-2 cursor-pointer'>{cardName}</p>

                <button type='button' onClick={openCard} className='w-10 h-10 ml-auto rounded-lg hover:border-2 border-gray-900 cursor-pointer'>
                    <OpenInNewOutlined />
                </button>
            </div>
        </div>
    )
}

export default UserCards