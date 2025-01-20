import React from 'react'

const ImageInput = ({label, onChange}) => {
  return (
    <div className='w-full flex flex-col'>
        <p className="text-sm/6 text-gray-950">{label}</p>
        <input className='w-80 h-auto p-1 border border-gray-500 rounded-lg' type='file' accept='image/*' onChange={onChange} />
    </div>
  )
}

export default ImageInput