import React, { useEffect } from 'react'

const ImageInput = ({ref, label, onChange, disabled}) => {


  return (
    <div className='w-full flex flex-col'>
        <p className="text-sm/6 text-gray-950">{label}</p>
        <input ref={ref} className='w-[270px] h-auto p-1 border border-gray-500 rounded-lg' type='file' disabled={disabled} accept='image/*' onChange={onChange} />
    </div>
  )
}

export default ImageInput