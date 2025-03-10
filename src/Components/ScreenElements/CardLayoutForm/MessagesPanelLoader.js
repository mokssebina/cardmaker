import React from 'react'

const MessagesPanelLoader = () => {
    return (
        <div className='w-full flex flex-col'>
            <div className='w-1/6 h-[14px] bg-slate-400 animate-pulse'></div>
            <div className='w-full h-36 mt-1 rounded-lg bg-slate-400 animate-pulse'></div>
            <div className='w-full flex flex-row'>
                <div className='relative w-10 h-10 mt-6 mr-3 rounded-lg bg-slate-400 animate-pulse'></div>
                <div className='relative w-28 h-10 mt-6 mr-3 rounded-lg bg-slate-400 animate-pulse'></div>
                <div className='absolute w-10 h-10 right-0 mt-6 mr-3 rounded-lg bg-slate-400 animate-pulse'></div>
            </div>
        </div>
    )
}

export default MessagesPanelLoader