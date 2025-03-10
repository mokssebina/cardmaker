import React from 'react'

const CardLoader = () => {
  return (
    <div className='w-screen h-screen overflow-scroll overscroll-none'>

      <div className={`relative w-full h-full`}>

      <div className={'relative w-2/5 ml-[30%] h-14 top-4 border py-2 rounded-lg bg-slate-400 animate-pulse'}></div>

        <div className={`absolute bottom-0 w-2/5 h-5/6 ml-[30%] flex flex-col`}>

          <div className={`relative w-full h-1/4 pb-2`}>
            
            <div className='w-full h-4 rounded bg-slate-400 animate-pulse'></div>

            <div className='w-full h-4 mt-2 rounded bg-slate-400 animate-pulse'></div>

            <div className='w-2/3 h-4 mt-2 rounded bg-slate-400 animate-pulse'></div>

          </div>

          <div className='relative w-full aspect-square p-2'>

            <div className='w-full  h-full bg-slate-400 rounded-lg animate-pulse'></div>
            
          </div>

        </div>

      </div>

    </div>
  )
}

export default CardLoader