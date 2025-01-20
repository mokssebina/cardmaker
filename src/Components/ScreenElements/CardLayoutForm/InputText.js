import React, { Fragment } from 'react'
import clsx from 'clsx';
import { Description, Input } from '@headlessui/react'



const InputText = ({ label, placeholder, name, value, onChange }) => {
    return (
        <div className='w-full flex flex-col'>
            <p className="text-sm/6 text-gray-950">{label}</p>
            <Input type="text" name={name} as={Fragment}>
                {({ focus, hover }) => <input placeholder={placeholder} className={clsx('w-80 h-12 p-1 border border-gray-500 rounded-lg', focus && 'bg-gray-100', hover && 'shadow')} value={value} onChange={onChange} />}
            </Input>
        </div>
    )
}

export default InputText