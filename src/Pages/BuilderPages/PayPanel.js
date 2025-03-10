import React from 'react'

//////////////---Animation imports---////////////////////
import { motion } from "framer-motion";

//////////////---Icon imports---////////////////////
import { Close } from '@mui/icons-material';
import { ListSubheader } from '@mui/material';

//////////////---Screen imports---////////////////////
import PayCard from './PayCard';

//////////////---API imports---////////////////////



const PayPanel = ({ close, openPay, cardBundles, makePurchase, email, quantity }) => {
    return (
        <motion.div
            initial={{ x: "100%" }}
            animate={{ x: openPay ? "0%" : "100%" }}
            transition={{ type: "spring", stiffness: 80 }}
            className='absolute w-1/3 h-screen top-0 right-0 bg-gray-950 ml-auto z-30'
        >
            <div className='w-full h-full flex flex-col text-white'>

                <div className='w-full h-16 py-3 flex flex-row px-3'>
                    <h1 className='font-semibold mt-2'>Buy Tokens</h1>
                    <button onClick={close} className='w-10 h-10 ml-auto'>
                        <Close />
                    </button>
                </div>

                <div style={{ height: 'calc(100% - 4rem)' }} className='relative w-full pt-10 px-3 pb-4 overflow-y-auto'>

                    {cardBundles?.map((item) => (
                        <PayCard type={item.type} buypackage={item.buypackage} features={item.features} price={item.price} button={item.button} makePurchase={makePurchase} id={item.id} email={email} quantity={quantity} />
                    ))}

                </div>

            </div>
        </motion.div>
    )
}

export default PayPanel