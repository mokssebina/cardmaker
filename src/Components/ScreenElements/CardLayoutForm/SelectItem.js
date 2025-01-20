import React, { Fragment } from 'react'
import clsx from 'clsx';
import { Select } from '@headlessui/react'



const SelectItem = (label, value, handleChange, items) => {
    return (
        <div className='w-full flex flex-col'>
            <p className="text-sm/6 text-gray-950">{label}</p>
            <Select value={value} onChange={handleChange}>{items}</Select>
        </div>
    )
}

export default SelectItem