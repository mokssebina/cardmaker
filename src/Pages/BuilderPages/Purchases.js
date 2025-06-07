import React, { useEffect, useState, useMemo } from 'react'

//////////////---Context imports---////////////////////
import { useAuth } from '../../Context/AuthContext'

//////////////---Toast imports---////////////////////
import { toast } from 'react-hot-toast'

//////////////---Formik imports---////////////////////
import { useDispatch, useSelector } from 'react-redux';

//////////////---Headless UI imports---////////////////////
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'

//////////////---Icon imports---////////////////////
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'

//////////////---Time imports---////////////////////
import moment from 'moment'

//////////////---API imports---////////////////////
import { getPurchases, resetGetPurchases } from '../Slices/GetPurchasesSlice'

//////////////---Data imports---////////////////////
import { cardBundles } from './bundles';

//////////////---Screen imports---////////////////////
import PurchasesLoader from '../../Components/ScreenElements/PuchasesElements/PurchasesLoader';
import PurchaseItem from '../../Components/ScreenElements/PuchasesElements/PurchaseItem';



const Purchases = () => {

  const { session } = useAuth()
  const dispatch = useDispatch()
  const { purchases, purchasesLoading, purchasesError } = useSelector((state) => state.getpurchases);

  useEffect(() => {
    if (!purchases) {
      dispatch(getPurchases(session.user?.id))
    }
  }, [])

  useEffect(() => {
    if (purchasesError) {
      toast.error(purchasesError)
    }
    return () => dispatch(resetGetPurchases())
  }, [purchasesError])

  const getProductName = (value) => {
    let findName = cardBundles?.filter((item) => (item?.id === value))
    console.log("product name: ", findName)

    return findName[0]?.type
  }

  const getProductPrice = (value) => {
    let findName = cardBundles?.filter((item) => (item?.id === value))

    return findName[0]?.price
  }


  return (
    <div className='relative w-full flex flex-col space-y-3 rounded-lg p-4'>

      <div className='w-full md:w-4/5 lg:w-4/5 mx-auto'>

        <p className='font-semibold text-xl md:text-3xl mb-7'>Purchases</p>

        {purchasesLoading && <PurchasesLoader />}

        {(!purchasesLoading && purchases) &&
          <>
            {/*purchases?.map((item) => (
              <PurchaseItem
                productName={getProductName(item?.price_id)}
                productPrice={getProductPrice(item?.price_id)}
                transactionId={item?.transaction_id}
                orderId={item?.order_id}
                priceId={item?.price_id}
                purchaseDate={item?.purchased_at}
              />
            ))*/}
          </>
        }

      </div>

    </div>
  )
}

export default Purchases