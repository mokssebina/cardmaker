import React, { useEffect, useState } from 'react'

//////////////---Context imports---////////////////////
import { useAuth } from '../../Context/AuthContext'

//////////////---Toast imports---////////////////////
import { toast } from 'react-hot-toast'

//////////////---Formik imports---////////////////////
import { useDispatch, useSelector } from 'react-redux';

//////////////---Icon imports---////////////////////
import { Add } from '@mui/icons-material';

//////////////---Screen imports---////////////////////
import UserCards from '../../Components/ScreenElements/CardsPageElements/UserCards';
import PayPanel from './PayPanel';

//////////////---API imports---////////////////////
import { fetchCards } from '../Slices/GetCardsSlice';

//////////////---Asset imports---////////////////////
import Day from '../../Assets/Day.png'

//////////////---Data imports---////////////////////
import { cardBundles } from './bundles';



const Cards = () => {

  const { session, preview, togglePreview, openCheckout } = useAuth()
  const dispatch = useDispatch()
  const { cards, cardsLoading, getCardsError } = useSelector((state) => state.getcards);

  const [openPay, setOpenPay] = useState(false)

  useEffect(() => {
    if (!cards) {
      dispatch(fetchCards(session.user?.id))
    }
  }, [])

  const createCard = () => {
    setOpenPay(!openPay)
  }

  const closePayPanel = () => {
    setOpenPay(!openPay)
  }

  const openCard = (cardId) => {
    console.log("link: ", cardId)
    window.open(`http://localhost:3000/card/${cardId}`)
  }


  return (

    <>

      <div className='relative w-full flex flex-col space-y-3 p-4'>

        <div className='w-full h-24 flex flex-col py-4 mt-10'>

          <button onClick={createCard} className='w-36 h-12 py-3 px-3 rounded bg-gray-950 text-white align-middle'>
            <div className='w-full h-full flex flex-row space-x-2'>
              <Add />
              <p>New Card</p>
            </div>
          </button>

        </div>

        <div className="w-11/12 h-auto mt-20 relative gap-2 grid grid-flow-row-dense grid-cols-2 md:grid-cols-4">
          {cards?.map((item) => (
            <UserCards
              key={item.card_id}
              cardTitle={item.card_data?.cardTitle}
              font={item.card_data?.titleFont}
              cardName={item.card_data?.cardName}
              bgImage={item.card_data?.template === "dayNight" ? Day : ''}
              lightColor={item.card_data?.lightTheme}
              darkColor={item.card_data?.darkTheme}
              introText={item.card_data?.introText}
              img={item.card_data?.coverImage}
              paid={item.paid}
              openCard={() => openCard(item.card_id)}
            />
          ))}
        </div>

      </div>

          <PayPanel openPay={openPay} close={closePayPanel} cardBundles={cardBundles} email={session.user?.email} makePurchase={openCheckout} />

    </>

  )
}

export default Cards