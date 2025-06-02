import React, { useEffect, useState } from 'react'

//////////////---Context imports---////////////////////
import { useAuth } from '../../Context/AuthContext'

//////////////---Toast imports---////////////////////
import { toast } from 'react-hot-toast'

//////////////---Nanoid imports---////////////////////
import { nanoid } from "nanoid";

//////////////---Formik imports---////////////////////
import { useDispatch, useSelector } from 'react-redux';

//////////////---Icon imports---////////////////////
import { Add } from '@mui/icons-material';

//////////////---Material UI imports---///////////////
import { Tooltip, CircularProgress, Divider } from '@mui/material';

//////////////---Screen imports---////////////////////
import UserCards from '../../Components/ScreenElements/CardsPageElements/UserCards';
import PayPanel from './PayPanel';
import NewCardDialog from '../../Components/ScreenElements/CardsPageElements/NewCardDialog';

//////////////---API imports---////////////////////
import { fetchCards } from '../Slices/GetCardsSlice';
import { updateCredits } from '../Slices/UpdateCredits';
import { updatePurchases, resetPurchaseUpdate } from '../Slices/UpdatePurchases';
import { resetCreateCard } from '../Slices/CreateCard';

//////////////---Asset imports---////////////////////
import Day from '../../Assets/Day.png'

//////////////---Data imports---////////////////////
import { cardBundles } from './bundles';
import { localUrl } from '../../environments';





const Cards = () => {

  const { session, setShowNav, togglePreview, panel, setPanel, purchaseData, setPurchaseData } = useAuth()
  const dispatch = useDispatch()
  const { cards, cardsLoading, getCardsError } = useSelector((state) => state.getcards);
  const { userProfile, profileLoading, profileError } = useSelector((state) => state.getuserprofile);
  const { createCardData, createCardLoading, createCardError } = useSelector((state) => state.createcard);
  const { updatedPurchases, purchasesError } = useSelector((state) => state.updatepurchases);


  const [open, setOpen] = useState(false)


  let id = nanoid(14)
  const [openPay, setOpenPay] = useState(false)

  useEffect(() => {
    if (!cards) {
      dispatch(fetchCards(session.user?.id))
    }
  }, [])

  useEffect(() => {
    if (purchaseData) {
      dispatch(updatePurchases(purchaseData))
    }
  }, [purchaseData])

  useEffect(() => {
    if (updatedPurchases) {
      dispatch(resetPurchaseUpdate())
      setPurchaseData()
    }
  }, [updatedPurchases])

  useEffect(() => {
    if (purchasesError) {
      toast.error(purchasesError)
    }
    if (getCardsError) {
      toast.error(getCardsError)
    }
  }, [purchasesError, getCardsError])


  const createNewCard = () => {
    if (userProfile[0]?.credits === 0) {
      toast.error('You are out of credits. Please purchase more!')
      setPanel(!panel)
    } else if (!userProfile[0]?.credits === null) {
      toast.error('Something went wrong, please try again later!')
      //setPanel(!panel)
    } else {
      /*
      let cardData = {
        userId: session.user?.id,
        postId: id
      }
      dispatch(createCard(cardData))
      */
      setOpen(!open)
      console.log("create card")
    }
  }

  const closeDialog = () => {
    setOpen(!open)
  }

  const closePayPanel = () => {
    setOpenPay(!openPay)
  }

  const openCard = (cardId) => {
    console.log("link: ", cardId)
    window.open(`${localUrl}/${cardId}`)
  }

  const closePanel = () => {
    setOpenPay(!openPay)
  }


  useEffect(() => {
    setShowNav(false)
  }, [])

  useEffect(() => {
    if (panel) {
      console.log("panel open")
      //setOpenPay(!openPay)
      //setPanel(!panel)
    }
  }, [panel])

  useEffect(() => {

    if (createCardData) {
      console.log("card created")
      setOpen(!open)
      dispatch(fetchCards(session.user?.id))
      dispatch(updateCredits({
        credits: userProfile[0]?.credits - 1,
        id: session.user?.id
      }))
    }
    if (createCardError) {
      toast.error(createCardError)
    }

    return () => dispatch(resetCreateCard())

  }, [createCardData, createCardError])


  return (

    <>
      <NewCardDialog open={open} setOpen={closeDialog} userId={session.user?.id} />
      <div className='relative w-full flex flex-col space-y-3 p-4'>

        <p className='font-semibold text-xl md:text-3xl'>Pages</p>

        <div className='w-full h-24 flex flex-col py-4 mt-10'>

          <button onClick={createNewCard} className='w-36 h-12 py-3 px-3 rounded bg-gray-950 text-white align-middle'>
            <div className='flex flex-row space-x-2 align-middle'>
              {!userProfile[0]?.credits ?
                <p className='mx-auto'>Buy Credits</p>
                :
                <>
                  <Add />
                  <p>New Page</p>
                </>
              }
            </div>
          </button>

        </div>

        {cardsLoading || createCardLoading &&
          <div className='w-full h-auto'>

            {cardsLoading &&
              <div className='w-full flex flex-col'>
                <div className='w-full h-14 text-center'>
                  <CircularProgress size={20} color='#030712' />
                </div>
                <div className='w-full text-center animate-pulse text-gray-950'>
                  Retrieving your cards...
                </div>
              </div>
            }

            {/*createCardLoading &&
              <div className='w-full flex flex-col'>
                <div className='w-full h-14 text-center'>
                  <CircularProgress size={20} color='#030712' />
                </div>
                <div className='w-full text-center animate-pulse text-gray-950'>
                  Creating a new card card...
                </div>
              </div>
            */}

          </div>
        }

        <div className="w-full md:w-11/12 h-auto mt-20 relative gap-2 grid grid-flow-row-dense grid-cols-2 md:grid-cols-4">

          {(!cardsLoading && !createCardLoading) &&
            <>
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
            </>
          }

        </div>

      </div>

    </>

  )
}

export default Cards