import React, { useState } from 'react'

//////////////---Headless ui imports---////////////////////
import { Button, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'

//////////////---Icon imports---////////////////////
import CloseIcon from '@mui/icons-material/Close';

//////////////---Import images---////////////////////
import avoImage from '../../../Assets/images/Avo.png'
import cactusImage from '../../../Assets/images/Cactus.png'
import congratsImage from '../../../Assets/images/Congrats.png'
import dadImage from '../../../Assets/images/Dad.png'
import danceImage from '../../../Assets/images/Dance.png'
import donkeyImage from '../../../Assets/images/Donkey.png'
import donutBdayImage from '../../../Assets/images/DonutBday.png'
import eggsImage from '../../../Assets/images/Eggs.png'
import kissesImage from '../../../Assets/images/Kisses.png'
import mumImage from '../../../Assets/images/Mum.png'
import okayImage from '../../../Assets/images/Okay.png'
import otterImage from '../../../Assets/images/Otter.png'
import poundImage from '../../../Assets/images/DonutBday.png'
import yayImage from '../../../Assets/images/Yay.png'
import zombieImage from '../../../Assets/images/Zombie.png'



const TemplateImages = ({open, closeImages, selectImage}) => {

    let images = [
        {id: 1, image: avoImage},
        {id: 2, image: cactusImage},
        {id: 3, image: congratsImage},
        {id: 4, image: dadImage},
        {id: 5, image: danceImage},
        {id: 6, image: donkeyImage},
        {id: 7, image: donutBdayImage},
        {id: 8, image: eggsImage},
        {id: 9, image: kissesImage},
        {id: 10, image: mumImage},
        {id: 11, image: okayImage},
        {id: 12, image: otterImage},
        {id: 13, image: poundImage},
        {id: 14, image: yayImage},
        {id: 15, image: zombieImage}
    ]

    return (
        <Dialog open={open} as="div" className="relative z-10 focus:outline-none" onClose={() => { }}>
            <DialogBackdrop className="fixed inset-0 bg-black/30" />
            <div className="fixed inset-0 z-10 w-screen p-3">
                    <DialogPanel
                        transition
                        className="relative w-full sm:w-1/2 md:w-4/5 lg:w-3/5 h-full md:h-3/4 lg:h-full m-auto flex flex-col rounded-lg shadow-xl p-6 border backdrop-blur-2xl bg-white duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                    >
                        <div className='w-full h-16 flex flex-col'>
                            <DialogTitle as="h3" className="text-2xl font-semibold text-gray-950">
                                Template images
                            </DialogTitle>
                            <button type='button' disabled={false} onClick={closeImages} className='absolute w-10 h-6 p1 right-4'>
                                <CloseIcon />
                            </button>
                        </div>
                        <div style={{ height: 'calc(100% - 4rem)' }} className='relative w-full mt-6 grid grid-cols-3 gap-1 space-y-2 mx-auto p-1 overflow-y-auto'>
                            {images?.map((item) => (
                                <div onClick={() => selectImage(item.image)} className='w-full aspect-square cursor-pointer hover:bg-slate-100'>
                                    <img className='w-full h-full' alt={item.image} src={item.image} />
                                </div>
                            ))}
                        </div>
                    </DialogPanel>
            </div>
        </Dialog>
    )
}

export default TemplateImages