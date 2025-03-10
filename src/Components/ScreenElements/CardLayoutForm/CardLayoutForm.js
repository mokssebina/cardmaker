//////////////---React imports---////////////////////
import React, { useState } from 'react'

//////////////---Formik imports---////////////////////
import { Formik } from 'formik';

//////////////---Material UI imports---///////////////
import { Tooltip, CircularProgress, Divider } from '@mui/material';

//////////////---Icon imports---////////////////////
import { CreateOutlined, CopyAllOutlined, DeleteOutlined } from '@mui/icons-material';

//////////////---Headless UI imports---///////////////
import { Popover, PopoverButton, PopoverPanel, Select, Button } from '@headlessui/react';

//////////////---Color picker imports---///////////////
import { HexColorPicker } from "react-colorful";

//////////////---Data imports---///////////////
import { fontList } from './FontList';
//import { messages } from '../MessagePage/Messages/Messages';

//////////////---Screen elements imports---///////////////
import InputText from './InputText';
import TextAreaInput from './TextAreaInput';
import ImageInput from './ImageInput';
import MessagesInput from '../MessagePage/Messages/MessagesInput';
import MessageSender from '../MessagePage/Messages/MessageSender';
import MessagesPanelLoader from './MessagesPanelLoader';



const CardLayoutForm = ({
    formik, selectFont, selectedFont, handleChange, lightTheme, setLightTheme, darkTheme, setDarkTheme, lightText,
    setLightText, darkText, setDarkText, colorButtonDisabled, messages, selectMessage, editMessage, changeEditMessage,
    fontId, updatedMessageLoader, messageId, updateCardMessage, link, copyLink, deleteCardMessage, submitMessageLoader,
    submitMessage, cardMessagesLoading
}) => {


    return (
        <div className='w-full flex flex-col'>

            <form className='relative w-11/12 flex flex-col space-y-2' onSubmit={formik?.handleSubmit}>

                <div className='relative w-full h-16 flex flex-row mb-3'>

                    <div className='relative w-1/3 h-full py-1'>

                        <InputText label={'Card Name'} type={'text'} placeholder={'Enter card name'} name={'cardName'} value={formik?.values.cardName} onChange={formik?.handleChange('cardName')} />

                    </div>

                    <div className='relative w-2/3 h-full py-1 flex flex-row'>

                        <div className='relative w-1/2 h-full flex flex-row py-2 space-x-2'>

                            <div className='relative w-1/2 h-14 py-2'>
                                <p className="text-sm/6 mt-2 text-gray-950">Background Light</p>
                            </div>

                            <div className='relative w-1/2 h-14 py-2'>
                                <Popover className='relative z-20'>
                                    <PopoverButton disabled={colorButtonDisabled} className='relative w-11 h-11 rounded-full border border-gray-950'>
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
                        </div>
                        <div className='relative w-1/2 h-full flex flex-row py-2 space-x-2'>
                            <div className='relative w-1/2 h-14 py-2'>
                                <p className="text-sm/6 mt-2 text-gray-950">Background Dark</p>
                            </div>
                            <div className='relative w-1/2 h-14 py-2'>
                                <Popover className='relative z-20'>
                                    <PopoverButton disabled={colorButtonDisabled} className='relative w-11 h-11 rounded-full border border-gray-950'>
                                        <div style={{ backgroundColor: `${darkTheme}` }} className={`w-9 h-9 mx-auto rounded-full border border-gray-950`}></div>
                                    </PopoverButton>
                                    <PopoverPanel className='w-60 aspect-square'>
                                        <div className='w-full'>
                                            <HexColorPicker className='relative mx-auto' color={darkTheme} onChange={setDarkTheme} />
                                        </div>
                                    </PopoverPanel>
                                </Popover>
                            </div>
                        </div>
                    </div>

                </div>

                {/*-------------------------------Background and text colour section---------------------------------*/}
                <div className='relative w-full h-16 flex flex-row'>

                    <div className='relative w-1/3 h-full py-1'>
                        <InputText label={'Card Title'} placeholder={'Enter card title'} name={'cardTitle'} value={formik?.values.cardTitle} onChange={formik?.handleChange('cardTitle')} />
                    </div>

                    <div className='relative w-2/3 h-full pt-4 flex flex-row'>
                        <div className='relative w-1/2 h-full flex flex-row py-2 space-x-2'>
                            <div className='relative w-1/2 h-14 py-2'>
                                <p className="text-sm/6 mt-2 text-gray-950">Text Light</p>
                            </div>
                            <div className='relative w-1/2 h-14 py-2'>
                                <Popover className='relative z-10'>
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
                        </div>
                        <div className='relative w-1/2 h-full flex flex-row py-2 space-x-2'>
                            <div className='relative w-1/2 h-14 py-2'>
                                <p className="text-sm/6 mt-2 text-gray-950">Text Dark</p>
                            </div>
                            <div className='relative w-1/2 h-14 py-2'>
                                <Popover className='relative z-10'>
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
                </div>

                <div className='w-full my-3'>
                    <Divider variant="fullWidth" sx={{ marginTop: '32px' }} />
                </div>


                {/*-------------------------------Fonts and card input section---------------------------------*/}
                <div className='relative w-full pt-4 flex flex-row'>

                    <div className='w-1/3 h-full'>

                        <p className="text-sm/6 text-gray-950">Select Font</p>
                        <div className='w-52 h-72 flex flex-col overflow-y-auto p-1 border border-gray-900 rounded-md'>
                            {
                                fontList.map((item) => (
                                    <div key={item.id} onClick={() => selectFont(item)} className={`relative w-full h-10 p-[2px] mt-[2px] align-middle ${item.fontFamily === selectedFont ? 'bg-gray-900' : 'bg-transparent'} cursor-pointer border border-gray-900 rounded-md`}>
                                        <div className={`w-full h-full bg-white py-1 rounded`}>
                                            <p style={{ fontFamily: item.fontFamily }} className={`relative text-base text-center`}>happy birthday</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                    </div>

                    <div className='w-2/3 h-full flex flex-col'>

                        <TextAreaInput label={'Intro Text'} placeholder={'Enter card intro'} name={'introText'} value={formik?.values.introText} onChange={formik?.handleChange('introText')} />

                        <div className='relative w-1/2 h-14 py-1 mb-4'>
                            <ImageInput label={'Cover Image'} onChange={handleChange} />
                        </div>

                        <TextAreaInput label={'Message'} placeholder={'Enter card message'} name={'message'} value={formik?.values.message} onChange={formik?.handleChange('message')} />

                    </div>

                </div>

                <div className='w-full my-1'>
                    <Divider variant="fullWidth" sx={{ marginTop: '24px', marginBottom: '12px' }} />
                </div>

                <div className='w-full h-12 flex flex-row py-1'>
                    <div className='relative w-96 h-full flex flex-row pt-2 align-middle rounded-lg line-clamp-1'>
                        <p className='relative line-clamp-1'>{link}</p>
                    </div>
                    <Tooltip title={'Click here to copy the link and share with anyone who wants to send their well wishes!'}>
                        <button className='w-10 h-10 rounded-lg hover:border-2 border-gray-900' onClick={() => copyLink(link)}>
                            <CopyAllOutlined />
                        </button>
                    </Tooltip>
                </div>

                <div className='w-full'>
                    <Divider variant="fullWidth" sx={{ marginTop: '12px', marginBottom: '18px' }} />
                </div>

                {/*-------------------------------Card messages section---------------------------------*/}
                {messages?.length > 0 &&
                    <div className='relative w-full h-auto flex flex-row py-1'>

                        <div className='w-1/3 h-full'>

                            <p className="text-sm/6 text-gray-950">Senders</p>
                            <div className='w-52 h-52 flex flex-col overflow-y-auto p-1 border border-gray-900 rounded-md'>
                                {messages?.map((item) => (
                                    <MessageSender key={item.message_id} selectMessage={() => selectMessage(item)}
                                        name={item.sender} messageId={messageId} selectedMessageId={item.message_id}
                                    />
                                ))}
                            </div>

                        </div>

                        <div className='w-2/3 h-full flex flex-col'>
                            {cardMessagesLoading ?
                                <MessagesPanelLoader />
                                :
                                <>
                                    <MessagesInput label={'Edit'} placeholder={'Message'} name={'edit message'} value={editMessage} onChange={changeEditMessage} />
                                    <div className='w-full flex flex-row'>
                                        <Tooltip title={'Click to send a message!'}>
                                            <button type='button' disabled={submitMessageLoader} onClick={submitMessage} className='relative w-10 h-10 mt-6 mr-3 rounded-lg hover:border-2 border-gray-900'>
                                                <CreateOutlined />
                                            </button>
                                        </Tooltip>
                                        <button type='button' disabled={updatedMessageLoader} onClick={updateCardMessage} className='w-28 h-10 rounded bg-gray-950 py-2 px-4 text-sm mt-6 text-white data-[hover]:bg-gray-800'>{updatedMessageLoader ? <CircularProgress size={20} color='#ffffff' /> : 'Update'}</button>
                                        <Tooltip title={'Click to delete this message!'}>
                                            <button type='button' onClick={deleteCardMessage} className='absolute w-10 h-10 right-0 mt-6 rounded-lg hover:border-2 border-gray-900'>
                                                <DeleteOutlined />
                                            </button>
                                        </Tooltip>
                                    </div>
                                </>
                            }
                        </div>

                    </div>
                }

                <div className='w-full my-3'>
                    <Divider variant="fullWidth" sx={{ marginTop: '16px' }} />
                </div>

                <div className='relative w-full py-4 flex flex-row'>
                    <button type='submit' className='w-36 h-10 rounded bg-gray-950 py-2 px-4 text-sm mx-auto text-white data-[hover]:bg-gray-800'>{!true ? <CircularProgress size={20} color='#ffffff' /> : 'Save Changes'}</button>
                </div>

            </form>

        </div>
    )
}

export default CardLayoutForm