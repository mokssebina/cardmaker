import React from 'react'

const FontItem = ({key, selectFont, selectedFont, item, font}) => {
    return (
        <div key={key} onClick={selectFont} className={`min-w-44 md:w-full h-10 p-[2px] md:mt-[2px] mx-[1px] md:mx-0 align-middle ${item?.fontFamily === selectedFont ? 'bg-gray-900' : 'bg-transparent'} cursor-pointer border border-gray-900 rounded-md`}>
            <div className={`w-full h-full bg-white py-1 rounded`}>
                <p style={{ fontFamily: item?.fontFamily }} className={`line-clamp-1 relative text-base text-center`}>{font}</p>
            </div>
        </div>
    )
}

export default FontItem