import React, { useState, useEffect } from 'react'

//////////////---Router imports---////////////////////
import { useParams } from 'react-router-dom'

//////////////---Toast imports---////////////////////
import { toast } from 'react-hot-toast'

//////////////---Redux imports---////////////////////
import { useDispatch, useSelector } from 'react-redux';

//////////////---Screen imports---////////////////////
import CardHeader from '../../Components/ScreenElements/PreviewElements/CardHeader'
import Footer from '../../Components/ScreenElements/PreviewElements/Footer'
import lightDay from '../../Assets/Day.png'
import darkDay from '../../Assets/Night.png'
import CardLoader from '../../Components/ScreenElements/CardPageElements/CardLoader';
import MessageItem from '../../Components/ScreenElements/MessagePage/Messages/MessageItem';

//////////////---API imports---////////////////////
import { loadCard } from '../Slices/LoadCardSlice';
import { getCardMessages } from '../Slices/GetMessagesSlice';




const CardPreview = ({ lightTheme, darkTheme, template, cardTitle, lightText, darkText, titleFont, introText, coverImage, birthdayMessage, messages }) => {

    /*
    const dispatch = useDispatch()
    const { cardData, cardDataLoading, getCardDataError } = useSelector((state) => state.loadcard);
    const { cardMessages, cardMessagesLoading, getCardMessagesError } = useSelector((state) => state.getcardmessages);
    
    const { card_id } = useParams()

    useEffect(() => {
        dispatch(loadCard(card_id))
    }, [])

    useEffect(() => {
        if (cardData) {
            dispatch(getCardMessages(card_id))
            setCardValues(cardData[0]?.card_data)
        }
    }, [cardData])

    useEffect(() => {
        if (getCardDataError) {
            toast.error(getCardDataError)
        }
    }, [getCardDataError])

    useEffect(() => {
        if (getCardMessagesError) {
            toast.error(getCardMessagesError)
        }
    }, [getCardMessagesError])
    */

    const [day, setDay] = useState(true)

    useEffect(() => {
        if(template !== 'default'){
            console.log('template', template)
        }
    },[])


    return (

        <div style={{ backgroundColor: `${day ? lightTheme : darkTheme}` }} className='w-screen h-screen overscroll-none'>

            {/*Cover page*/}

            <div style={{ transition: 'background-image 1s' }} className={`relative top-0 w-screen h-screen bg-center bg-cover`}>

                {template && <img className="w-full h-full object-cover" src={`${day ? lightDay : darkDay}`} />}

                <div className="absolute z-10 top-0 w-full h-full flex flex-col">

                    <div className="relative w-full h-[25%] px-2">

                        <div className='relative w-full h-1/2 pt-4'>

                            <CardHeader day={day} setDay={() => setDay(!day)} cardTitle={cardTitle} headerLight={lightTheme} headerDark={darkTheme} lightColor={lightText} darkColor={darkText} font={titleFont} />

                        </div>

                        <div className='relative w-full h-1/2 py-1'>

                            <div className={`relative w-11/12 md:w-[600px] mx-auto h-full border border-dashed rounded-lg p-2 ${day ? `border-[#283038]` : `border-[#cee5f0]`}`}>

                                <p style={{ color: day ? `${darkText}` : `${lightText}` }} className='relative text-sm md:text-lg'>{introText}</p>

                            </div>

                        </div>

                    </div>

                    <div className="relative w-full h-[75%] pt-10 pb-1 md:pt-0 px-2">

                        <div className={`relative w-11/12 md:w-[600px] mt-3 mx-auto flex flex-col border border-dashed rounded-lg ${day ? 'border-[#283038]' : 'border-[#cee5f0]'}`}>

                            <div className='relative w-full aspect-square'>
                                {coverImage && <img className="w-full h-full object-contain" src={`${coverImage}`} />}
                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/*Second page*/}

            <div style={{ backgroundColor: `${day ? lightTheme : darkTheme}` }} className={`relative w-screen h-auto pt-8 pb-8 flex flex-col`}>

                <div className={`relative w-11/12 md:w-3/5 h-64 mx-auto`}>

                    <div className={`relative w-full h-48 p-2 border border-dashed rounded-lg ${day ? `text-[${darkText}] border-[#283038]` : `text-[${lightText}] border-[#cee5f0]`}`}>
                        <p className='relative text-sm md:text-lg'>{birthdayMessage}</p>
                    </div>

                </div>

                {messages?.length > 0 &&
                    <div className="w-11/12 md:w-3/5 mx-auto h-auto mt-20 relative grid grid-flow-row-dense grid-cols-2 md:grid-cols-3">

                        {messages?.map((item) => (
                            <MessageItem openModal={() => { }} key={item.id} message={item.message} name={item.sender} day={day} darkTextColor={darkText} lightTextColor={lightText} />
                        ))}

                    </div>
                }

            </div>

            {/*Footer*/}

            <Footer day={day} cardTitle={cardTitle} lightColor={lightText} darkColor={darkText} font={titleFont}
                footerLight={lightTheme} footerDark={darkTheme} darkTextColor={darkText} lightTextColor={lightText}
            />

        </div>

    )
}

export default CardPreview