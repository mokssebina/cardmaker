import React, { useEffect, useState } from 'react'

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
            {purchases?.map((item) => (
              <Disclosure as="div" className='w-full rounded-md mb-1 border border-gray-900'>

                {({ open }) => (
                  <>
                    <DisclosureButton className="w-full py-2 px-2">
                      <div className='w-full h-12 flex flex-row'>
                        <div className='w-1/2 h-full flex flex-row items-center'>
                          <p className='text-sm md:text-base text-left'>{`Product Name: ${getProductName(item?.price_id)}`}</p>
                        </div>
                        <div className='w-1/2 h-full items-center flex flex-row'>
                          <div className='h-full ml-auto flex flex-row items-center'>
                            <p className='text-base text-right mr-3'>{`$ ${getProductPrice(item?.price_id)}`}</p>
                            <ChevronRightIcon className={clsx('w-5', open && 'rotate-90')} />
                          </div>
                        </div>
                      </div>
                    </DisclosureButton>
                    <DisclosurePanel className="text-gray-500">
                      <div className='w-full h-28 p-2 flex flex-col'>
                        <div className='w-full h-12 flex flex-col md:flex-row'>
                          <div className='w-full md:w-1/2 h-full flex flex-row items-center'>
                            <p className='text-xs md:text-base text-left'>{`Transaction ID: ${item?.transaction_id}`}</p>
                          </div>
                          <div className='w-full md:w-1/2 h-full flex flex-row items-center'>
                            <p className='text-xs md:text-base text-left'>{`Order ID: ${item?.order_id}`}</p>
                          </div>
                        </div>

                        <div className='w-full h-12 flex flex-col md:flex-row'>
                          <div className='w-full md:w-1/2 h-full flex flex-row items-center'>
                            <p className='text-xs md:text-base text-left'>{`Price ID: ${item?.price_id}`}</p>
                          </div>
                          <div className='w-full md:w-1/2 h-full flex flex-row items-center'>
                            <p className='text-xs md:text-base text-left'>{`Purchased at: ${item?.purchased_at}`}</p>
                          </div>
                        </div>

                      </div>
                    </DisclosurePanel>
                  </>
                )}

              </Disclosure>
            ))}
          </>
        }

      </div>

    </div>
  )
}

export default Purchases