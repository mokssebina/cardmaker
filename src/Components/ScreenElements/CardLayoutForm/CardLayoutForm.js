import React, { useState } from 'react'
import { Formik } from 'formik';
import InputText from './InputText';
import TextAreaInput from './TextAreaInput';
import ImageInput from './ImageInput';
import { Popover, PopoverButton, PopoverPanel, Select, Button } from '@headlessui/react';
import { HexColorPicker } from "react-colorful";
import { color } from 'framer-motion';
import SelectItem from './SelectItem';
import { fontList } from './FontList';



const CardLayoutForm = ({ formik, validation, setSelectedFont, handleChange, lightTheme, setLightTheme, darkTheme, setDarkTheme, lightText, setLightText, darkText, setDarkText, colorButtonDisabled }) => {


    return (
        <div className='w-full h-auto flex flex-col'>

            <form className='relative w-11/12 h-full flex flex-col space-y-2' onSubmit={formik?.handleSubmit}>

                <div className='relative w-full h-20 flex flex-row mb-3'>
                    <div className='w-1/2 h-14 py-1'>
                        <InputText label={'Card Name'} placeholder={'Enter card name'} name={'cardName'} value={formik?.values.cardName} onChange={formik?.handleChange('cardName')} />
                    </div>
                </div>

                <div className='relative w-full h-16 flex flex-row'>
                    <div className='w-1/2 h-14 py-1 flex flex-row'>
                        <div className='w-1/2 h-full flex flex-row py-2 space-x-2'>
                            <p className="text-sm/6 mt-2 text-gray-950">Light</p>
                            <Popover className='relative z-20'>
                                <PopoverButton disabled={colorButtonDisabled} className='w-11 h-11 rounded-full border border-gray-950'>
                                    <div style={{ backgroundColor: `${lightTheme}` }} className={`w-9 h-9 mx-auto rounded-full border border-gray-950`}></div>
                                </PopoverButton>
                                <PopoverPanel className='w-60 aspect-square'>
                                    <div className='w-full'>
                                        <HexColorPicker className='relative mx-auto' color={lightTheme} onChange={setLightTheme} />
                                    </div>
                                    {/*
                                        <div className='w-full h-12 pt-2'>
                                            <Button className="rounded-lg w-52 ml-4 h-full bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700">
                                                Set Color
                                            </Button>
                                        </div>
                                        */}
                                </PopoverPanel>
                            </Popover>
                        </div>
                        <div className='w-1/2 h-full flex flex-row py-2 space-x-2'>
                            <p className="text-sm/6 mt-2 text-gray-950">Dark</p>
                            <Popover className='relative z-20'>
                                <PopoverButton disabled={colorButtonDisabled} className='w-11 h-11 rounded-full border border-gray-950'>
                                    <div style={{ backgroundColor: `${darkTheme}` }} className={`w-9 h-9 mx-auto rounded-full border border-gray-950`}></div>
                                </PopoverButton>
                                <PopoverPanel className='w-60 aspect-square'>
                                    <div className='w-full'>
                                        <HexColorPicker className='relative mx-auto' color={darkTheme} onChange={setDarkTheme} />
                                    </div>
                                    {/*
                                        <div className='w-full h-12 pt-2'>
                                            <Button className="rounded-lg w-52 ml-4 h-full bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700">
                                                Set Color
                                            </Button>
                                        </div>
                                        */}
                                </PopoverPanel>
                            </Popover>
                        </div>
                    </div>
                </div>

                <div className='relative w-full h-20 mb-5 flex flex-row'>
                    <div className='w-1/2 h-14 py-1'>
                        <InputText label={'Card Title'} placeholder={'Enter card title'} name={'cardTitle'} value={formik?.values.cardTitle} onChange={formik?.handleChange('cardTitle')} />
                    </div>
                    <div className='w-1/2 h-14 py-1 flex flex-row'>
                        <div className='w-1/2 h-full flex flex-row py-2 space-x-2'>
                            <p className="text-sm/6 mt-2 text-gray-950">Text Light</p>
                            <Popover className='relative z-20'>
                                <PopoverButton disabled={colorButtonDisabled} className='w-11 h-11 rounded-full border border-gray-950'>
                                    <div style={{ backgroundColor: `${lightText}` }} className={`w-9 h-9 mx-auto rounded-full border border-gray-950`}></div>
                                </PopoverButton>
                                <PopoverPanel className='w-60 aspect-square'>
                                    <div className='w-full'>
                                        <HexColorPicker className='relative mx-auto' color={lightText} onChange={setLightText} />
                                    </div>
                                </PopoverPanel>
                            </Popover>
                        </div>
                        <div className='w-1/2 h-full flex flex-row py-2 space-x-2'>
                            <p className="text-sm/6 mt-2 text-gray-950">Text Dark</p>
                            <Popover className='relative z-20'>
                                <PopoverButton disabled={colorButtonDisabled} className='w-11 h-11 rounded-full border border-gray-950'>
                                    <div style={{ backgroundColor: `${darkText}` }} className={`w-9 h-9 mx-auto rounded-full border border-gray-950`}></div>
                                </PopoverButton>
                                <PopoverPanel className='w-60 aspect-square'>
                                    <div className='w-full'>
                                        <HexColorPicker className='relative mx-auto' color={darkText} onChange={setDarkText} />
                                    </div>
                                </PopoverPanel>
                            </Popover>
                        </div>
                    </div>
                </div>

                <div className='relative w-full h-72 pt-4'>
                    <p className="text-sm/6 text-gray-950">Font menu</p>
                    <div className='w-52 h-56 flex flex-col overflow-y-auto p-1 border border-gray-900 rounded-md'>
                        {
                            fontList.map((item) => (
                                <div onClick={() => setSelectedFont(item.fontFamily)} className='w-full h-14 py-1 mt-[2px] align-middle cursor-pointer border border-gray-900 rounded-md'>
                                    <p style={{ fontFamily: item.fontFamily }} className={`relative text-base text-center`}>happy birthday</p>
                                </div>
                            ))
                        }
                    </div>

                </div>

                <div className='relative w-full h-72 py-1'>
                    <TextAreaInput label={'Intro Text'} placeholder={'Enter card intro'} name={'introText'} value={formik?.values.introText} onChange={formik?.handleChange('introText')} />
                </div>

                <div className='relative w-full flex flex-row'>
                    <div className='w-1/2 h-14 py-1'>
                        <ImageInput label={'Cover Image'} onChange={handleChange} />
                    </div>
                </div>

                <div className='relative w-full h-72 py-1'>
                    <TextAreaInput label={'message'} placeholder={'Enter card message'} name={'message'} value={formik?.values.message} onChange={formik?.handleChange('message')} />
                </div>

            </form>

        </div>
    )
}

export default CardLayoutForm