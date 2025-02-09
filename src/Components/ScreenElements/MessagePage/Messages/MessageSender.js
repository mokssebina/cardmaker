import React from 'react'

const MessageSender = ({ selectMessage, name }) => {
    return (
        <div onClick={selectMessage} className='w-full h-14 py-1 mt-[2px] align-middle cursor-pointer border border-gray-900 rounded-md'>
            <p className={`relative text-base text-center`}>{name}</p>
        </div>
    )
}

export default MessageSender