import React, { useState } from 'react'

//////////////---Headless ui imports---////////////////////
import { Button, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'

//////////////---Icon imports---////////////////////
import CloseIcon from '@mui/icons-material/Close';

//////////////---Material UI imports---///////////////
import { Skeleton, CircularProgress, Divider } from '@mui/material';



const ConfirmDialog = ({ confirm, closeConfirm, isOpen, deletedMessageLoading }) => {


    return (
        <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={() => {}}>
            <DialogBackdrop className="fixed inset-0 bg-black/30" />
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel
                        transition
                        className="w-full max-w-md flex flex-col rounded-lg shadow-xl p-6 border backdrop-blur-2xl bg-white duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                    >
                        <div className='w-full h-9 flex flex-col'>
                            <DialogTitle as="h3" className="text-base/7 font-medium text-gray-950">
                                Confirmation
                            </DialogTitle>
                            <button type='button' disabled={deletedMessageLoading} onClick={closeConfirm} className='absolute w-10 h-6 p1 right-4'>
                                <CloseIcon />
                            </button>
                        </div>

                        <p className="mt-2 text-sm/6 text-gray-950">
                            Are you sure you want to delete this message?
                        </p>
                        <div className="relative w-full mt-4">
                            <button
                                disabled={deletedMessageLoading}
                                className="relative w-1/2 h-14 mt-8 text-center ml-[25%] rounded bg-gray-950 cursor-pointer text-white"
                                onClick={confirm}
                            >
                                {deletedMessageLoading ? <CircularProgress size={20} color='#ffffff' /> : 'Delete Message'}
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}

export default ConfirmDialog