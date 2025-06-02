import React, { useEffect } from 'react'

//////////////---Context imports---////////////////////
import { useAuth } from '../../Context/AuthContext';

//////////////---Toast imports---////////////////////
import { toast } from 'react-hot-toast'

//////////////---Formik imports---////////////////////
import { useDispatch, useSelector } from 'react-redux';

//////////////---Material UI imports---////////////////////
import MenuIcon from '@mui/icons-material/Menu';
import { Tooltip } from '@mui/material';

//////////////---Icon imports---////////////////////
import PaymentsIcon from '@mui/icons-material/Payments';

//////////////---API imports---////////////////////
import { updateCredits, resetUpdateCredits } from '../../Pages/Slices/UpdateCredits';
import { getUserProfile } from '../../Pages/Slices/GetUserProfile';

//////////////---Data imports---////////////////////
import { cardBundles } from '../../Pages/BuilderPages/bundles';



const Header = ({ showNav, device }) => {

  const { session } = useAuth()
  const dispatch = useDispatch()
  const { userProfile, profileLoading, profileError } = useSelector((state) => state.getuserprofile);
  const { updatedPurchases, purchasesError } = useSelector((state) => state.updatepurchases);
  const { updatedCredits, creditsLoading, creditsError } = useSelector((state) => state.updatecredits);

  const getQuantity = (value) => {
    let object = cardBundles.filter(item => item.id === value)

    return object[0]?.quantity
  }

  useEffect(() => {
    if(userProfile){
      console.log("user profile: ",userProfile)
    }
  },[])

  useEffect(() => {
    if (updatedPurchases?.length > 0) {
      console.log("updating credits")
      let data = {
        id: session?.user.id,
        credits: getQuantity(updatedPurchases[0]?.price_id)
      }
      dispatch(updateCredits(data))
    }
  }, [updatedPurchases])

  useEffect(() => {
    if (updatedCredits?.length > 0) {
      dispatch(resetUpdateCredits())
      dispatch(getUserProfile(session?.user.id))
    }
    if (creditsError) {
      toast.error(creditsError)
    }
  }, [updatedCredits, creditsError])

  useEffect(() => {
    if (profileError) {
      toast.error(profileError)
    }
  }, [profileError])

  return (
    <div className='relative w-full h-20 md:h-24 flex flex-row p-2 z-0'>

      <div className='h-full aspect-square mr-auto'>

        {device !== 'Desktop' &&
          <button onClick={showNav} className='relative w-12 h-12 mx-auto my-auto text-center align-middle items-center rounded-lg hover:border-2 border-gray-900 cursor-pointer'>
            <MenuIcon />
          </button>
        }
        {/*
          <button className='w-10 h-10 p-2 cursor-pointer border border-gray-950 rounded-lg animate-bounce hover:animate-none'>
            <MoonIcon fontSize={24} />
          </button>
        */}
      </div>

      <div className='absolute h-12 right-3 text-center items-center align-middle flex flex-row'>
        {profileLoading || creditsLoading && <div className='relative w-14 h-4 my-auto rounded-sm bg-slate-400 animate-pulse'></div>}
        {(!profileLoading || !creditsLoading) &&
          <>
            {userProfile?.length &&
              <Tooltip title={!userProfile[0]?.credits ? 'Your out of credits. Please buy more' : ''}>
                <p className='mr-4'>{userProfile !== null && userProfile[0]?.credits}</p>
                <PaymentsIcon />
              </Tooltip>
            }
          </>
        }
      </div>

      {/*<div className='w-full border-b-2 mt-auto border-gray-950'></div>*/}
    </div>
  )
}

export default Header