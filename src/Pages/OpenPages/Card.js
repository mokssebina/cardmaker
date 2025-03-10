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
import { loadCard } from '../Slices/LoadCardSlice'
import { getCardMessages } from '../Slices/GetMessagesSlice';



const Card = () => {

    const dispatch = useDispatch()
    const { cardData, cardDataLoading, getCardDataError } = useSelector((state) => state.loadcard);
    const { cardMessages, cardMessagesLoading, getCardMessagesError } = useSelector((state) => state.getcardmessages);

    const { card_id } = useParams()

    const defaultLayout = true
    const [day, setDay] = useState(true)
    const [cardValues, setCardValues] = useState(null)

    useEffect(() => {
        console.log("load card")
        if (cardData === null) {
            dispatch(loadCard(card_id))
        }
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

    return (
        <>

            {cardDataLoading && <CardLoader />}

            {(!cardDataLoading && cardData !== null) &&
                <>

                    <div style={{ backgroundColor: `${day ? cardValues?.lightTheme : cardValues?.darkTheme}` }} className='w-screen h-screen overflow-scroll overscroll-none'>

                        {/*Cover page*/}

                        <div className={`relative w-full h-full`}>

                            {!cardValues?.template === "default" && <img className="relative w-full h-full object-cover" src={`${day ? lightDay : darkDay}`} />}

                            <div className="absolute z-10 top-0 w-full h-full flex flex-col">

                                <div className="relative w-full h-[25%] px-2">

                                    <div className='relative w-full h-1/2 pt-4'>

                                        <CardHeader day={day} setDay={() => setDay(!day)} cardTitle={cardValues?.cardTitle} headerLight={cardValues?.lightTheme} headerDark={cardValues?.darkTheme} lightColor={cardValues?.lightText} darkColor={cardValues?.darkText} font={cardValues?.titleFont} />

                                    </div>

                                    <div className='relative w-full h-1/2 py-1'>

                                        <div className={`relative w-11/12 md:w-[600px] mx-auto h-full p-2`}>

                                            <p style={{ color: day ? `${cardValues?.darkText}` : `${cardValues?.lightText}` }} className='relative text-sm'>{cardValues?.introText}</p>

                                        </div>

                                    </div>

                                </div>

                                <div className="relative w-full h-[75%] pt-10 pb-1 md:pt-0 px-2">

                                    <div className={`relative w-11/12 md:w-[600px] mx-auto flex flex-col rounded-lg`}>

                                        <div className='relative w-full aspect-square'>
                                            {cardValues?.coverImage && <img className="w-full h-full object-contain" src={`${cardValues?.coverImage}`} />}
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                        {/*Second page*/}

                        <div style={{ backgroundColor: `${day ? cardValues?.lightTheme : cardValues?.darkTheme}` }} className={`relative w-full h-auto pt-20 pb-8 flex flex-col`}>

                            <div className={`relative w-3/5 h-64 ml-[20%] flex flex-col`}>

                                <div className={`relative w-full h-48 p-2 rounded-lg ${day ? `text-[${cardValues?.darkText}]` : `text-[${cardValues?.lightText}]`}`}>
                                    <p className='relative text-xs'>{cardValues?.birthdayMessage}</p>
                                </div>

                            </div>

                            {cardMessages?.length > 0 &&
                                <div className="w-11/12 md:w-3/5 mx-auto h-auto mt-20 relative grid grid-flow-row-dense grid-cols-2 md:grid-cols-3">

                                    {cardMessages?.map((item) => (
                                        <MessageItem openModal={() => { }} key={item.id} message={item.message} name={item.sender} day={day} darkTextColor={cardValues?.darkText} lightTextColor={cardValues?.lightText} />
                                    ))}

                                </div>
                            }

                        </div>

                        {/*Footer*/}

                        <Footer day={day} cardTitle={cardValues?.cardTitle} lightColor={cardValues?.lightText} darkColor={cardValues?.darkText} font={cardValues?.titleFont}
                            footerLight={cardValues?.lightTheme} footerDark={cardValues?.darkTheme} darkTextColor={cardValues?.darkText} lightTextColor={cardValues?.lightText}
                        />

                    </div>

                </>
            }

        </>
    )
}

export default Card