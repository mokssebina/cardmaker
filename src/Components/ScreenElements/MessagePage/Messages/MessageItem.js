import React from 'react'

const MessageItem = ({day, message, name, openModal, darkTextColor, lightTextColor}) => {
  return (
    <div onClick={openModal} className='relative w-full aspect-square flex flex-col pt-4 px-4 text-left space-y-4 cursor-pointer'>
        <p style={{ color: day ? `${darkTextColor}` : `${lightTextColor}` }} className='text-xs line-clamp-4 mt-4'>{message}</p>
        <p style={{ color: day ? `${darkTextColor}` : `${lightTextColor}` }} className='absolute text-xs message bottom-[8%]'>{`From ${name}`}</p>
    </div>
  )
}

export default MessageItem