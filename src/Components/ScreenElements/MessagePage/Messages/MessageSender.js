import React from 'react'

const MessageSender = ({ selectMessage, name, messageId, selectedMessageId }) => {
    
    const reduceName = (value) => {
        if(value?.length > 14){
            let prefix = value?.substring(0, 11)

            return `${prefix}...`
        } else {
            return value
        }
    }

    return (
        <div onClick={selectMessage} className={`min-w-44 md:w-full h-10 p-[2px] md:mt-[2px] mx-[1px] md:mx-0 align-middle  ${ messageId === selectedMessageId ? 'bg-gray-900' : 'bg-transparent'} cursor-pointer border border-gray-900 rounded-md`}>
            <div className={`w-full h-full bg-white py-1 rounded`}>
                <p className={`relative text-base text-center text-gray-900`}>{reduceName(name)}</p>
            </div>
        </div>
    )
}

export default MessageSender