import React from 'react'

const MessageFormLoader = () => {
    return (
        <div className='relative w-96 mt-[10%] flex flex-grow flex-col space-y-2 mx-auto p-1'>

            <div className='w-full flex flex-col'>
                <div className='w-1/5 h-3 bg-slate-400 rounded animate-pulse'></div>
                <div className='w-full h-24 mt-1 bg-slate-400 animate-pulse rounded-lg'></div>
            </div>

            <div className='w-full flex flex-col mt-2'>
                <div className='w-1/5 h-3 bg-slate-400 rounded animate-pulse'></div>
                <div className='w-full h-12 mt-1 bg-slate-400 animate-pulse rounded-lg'></div>
            </div>

            <div className='relative w-full'>
                <div className='relative w-1/2 h-14 mt-8 bg-slate-400 animate-pulse mx-auto rounded'></div>
            </div>

        </div>
    )
}

export default MessageFormLoader