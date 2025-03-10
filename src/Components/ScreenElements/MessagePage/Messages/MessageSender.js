import React from 'react'

const MessageSender = ({ selectMessage, name, messageId, selectedMessageId }) => {
    return (
        <div onClick={selectMessage} className={`relative w-full h-10 p-[2px] mt-[2px] align-middle  ${ messageId === selectedMessageId ? 'bg-gray-900' : 'bg-transparent'} cursor-pointer border border-gray-900 rounded-md`}>
            <div className={`w-full h-full bg-white py-1 rounded`}>
                <p className={`relative text-base text-center text-gray-900`}>{name}</p>
            </div>
        </div>
    )
}

export default MessageSender