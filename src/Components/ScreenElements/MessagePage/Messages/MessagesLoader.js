import React from 'react'

const MessagesLoader = () => {
    return (
        <>
            <div className='w-1/3 h-full'>

                <div className='w-1/4 h-3 rounded bg-slate-400 animate-pulse'></div>

                <div className='w-52 h-52 rounded-md bg-slate-400 animate-pulse'></div>

            </div>

            <div className='w-2/3 h-full flex flex-col'>

                <div className='w-1/4 h-3 rounded bg-slate-400 animate-pulse'></div>

                <div className='w-full h-36 rounded-md bg-slate-400 animate-pulse'></div>

                <div className='w-28 h-10 mt-6 rounded bg-slate-400 animate-pulse'></div>
                
            </div>
        </>
    )
}

export default MessagesLoader