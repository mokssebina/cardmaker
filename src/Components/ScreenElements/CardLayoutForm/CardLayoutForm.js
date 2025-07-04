//////////////---React imports---////////////////////
import React, { useState, useEffect } from 'react'

//////////////---Formik imports---////////////////////
import { Formik } from 'formik';

//////////////---Material UI imports---///////////////
import { Tooltip, CircularProgress, Divider } from '@mui/material';

//////////////---Icons imports---///////////////
import FileUploadIcon from '@mui/icons-material/FileUpload';

//////////////---Icon imports---////////////////////
import { CreateOutlined, CopyAllOutlined, DeleteOutlined, AddOutlined, CloseOutlined } from '@mui/icons-material';

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
import FontItem from './FontItem';



const CardLayoutForm = ({
    formik, selectFont, selectedFont, handleChange, lightTheme, setLightTheme, darkTheme, setDarkTheme, lightText,
    setLightText, darkText, setDarkText, colorButtonDisabled, messages, selectMessage, editMessage, changeEditMessage,
    fontId, updatedMessageLoader, messageId, updateCardMessage, link, copyLink, deleteCardMessage, submitMessageLoader,
    submitMessage, cardMessagesLoading, uploadImage, uploadLoader, file, removeImage, handleImageChange, ref, openImages,
    imageType
}) => {

    const reduceName = (value) => {
        let name = value?.substr(14)
        return `${name?.substring(0, 16)}....`
    }

    return (
        <div className='w-full flex flex-col flex-grow'>

            <form className='relative w-full flex flex-col space-y-2' onSubmit={formik?.handleSubmit} onReset={formik?.handleReset}>

                <div className='relative w-full md:h-16 flex flex-col md:flex-row mb-3'>

                    <div className='relative w-full md:w-1/2 h-full py-1'>

                        <InputText label={'Card Name'} type={'text'} placeholder={'Enter card name'} name={'cardName'} value={formik?.values.cardName} onChange={formik?.handleChange('cardName')} />

                    </div>

                    <div className='relative w-full md:w-1/2 h-full py-1 flex flex-row'>

                        <div className='relative w-full md:w-1/2 h-full flex flex-row py-2 space-x-2'>

                            <div className='relative w-1/2 h-14 py-2'>
                                <p className="text-sm/6 mt-2 text-gray-950">Page Light</p>
                            </div>

                            <div className='mr-auto relative w-11 h-14 py-[6px]'>
                                <Popover className='relative'>
                                    <PopoverButton disabled={colorButtonDisabled} className='w-11 h-11 rounded-full border border-gray-950'>
                                        <div style={{ backgroundColor: `${lightTheme}` }} className={`w-9 h-9 mx-auto rounded-full border border-gray-950`}></div>
                                    </PopoverButton>
                                    <PopoverPanel anchor='right' className='w-60 aspect-square'>
                                        <div>
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
                        <div className='relative w-full md:w-1/2 h-full flex flex-row py-2 space-x-2'>
                            <div className='relative w-1/2 h-14 py-2'>
                                <p className="text-sm/6 mt-2 text-gray-950">Page Dark</p>
                            </div>
                            <div className='mr-auto relative w-11 h-14 py-[6px]'>
                                <Popover className='relative'>
                                    <PopoverButton disabled={colorButtonDisabled} className='mr-auto w-11 h-11 rounded-full border border-gray-950'>
                                        <div style={{ backgroundColor: `${darkTheme}` }} className={`w-9 h-9 mx-auto rounded-full border border-gray-950`}></div>
                                    </PopoverButton>
                                    <PopoverPanel anchor='right' className='w-60 aspect-square'>
                                        <div>
                                            <HexColorPicker className='relative mx-auto' color={darkTheme} onChange={setDarkTheme} />
                                        </div>
                                    </PopoverPanel>
                                </Popover>
                            </div>
                        </div>
                    </div>

                </div>

                {/*-------------------------------Background and text colour section---------------------------------*/}
                <div className='relative w-full md:h-16 flex flex-col md:flex-row'>

                    <div className='relativerelative w-full md:w-1/2 h-full py-1'>
                        <InputText label={'Card Title'} placeholder={'Enter card title'} name={'cardTitle'} value={formik?.values.cardTitle} onChange={formik?.handleChange('cardTitle')} />
                    </div>

                    <div className='relativerelative w-full md:w-1/2 h-full pt-4 flex flex-row'>
                        <div className='relative w-1/2 h-full flex flex-row py-2 space-x-1'>
                            <div className='relative w-1/2 h-14 py-2'>
                                <p className="text-sm/6 mt-2 text-gray-950">Text Light</p>
                            </div>
                            <div className='mr-auto relative w-11 h-14 py-[6px]'>
                                <Popover className='relative'>
                                    <PopoverButton disabled={colorButtonDisabled} className='mr-auto w-11 h-11 rounded-full border border-gray-950'>
                                        <div style={{ backgroundColor: `${lightText}` }} className={`w-9 h-9 mx-auto rounded-full border border-gray-950`}></div>
                                    </PopoverButton>
                                    <PopoverPanel anchor='right' className='w-60 aspect-square'>
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
                            <div className='mr-auto relative w-11 h-14 py-[6px]'>
                                <Popover className='relative'>
                                    <PopoverButton disabled={colorButtonDisabled} className='mr-auto w-11 h-11 rounded-full border border-gray-950'>
                                        <div style={{ backgroundColor: `${darkText}` }} className={`w-9 h-9 mx-auto rounded-full border border-gray-950`}></div>
                                    </PopoverButton>
                                    <PopoverPanel anchor='right' className='w-60 aspect-square'>
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
                <div className='relative w-full pt-4 flex flex-col md:flex-row'>

                    <div className='relative w-full md:w-1/3 h-full'>

                        <p className="text-sm/6 text-gray-950">Select Font</p>
                        <div className='w-full h-12 md:w-52 md:h-72 overflow-x-auto md:overflow-y-auto p-1 border border-gray-900 rounded-md'>
                            <div className='flex space-x-1 md:flex-col md:space-x-0'>
                                {
                                    fontList.map((item) => (
                                        <FontItem key={item.id} selectFont={() => selectFont(item)} selectedFont={selectedFont}
                                            item={item} font={formik?.values.cardTitle}
                                        />
                                    ))
                                }
                            </div>
                        </div>

                    </div>

                    <div className='relative w-full md:w-2/3 h-full flex flex-col'>

                        <TextAreaInput label={'Intro Text'} placeholder={'Enter card intro'} name={'introText'} value={formik?.values.introText} onChange={formik?.handleChange('introText')} />

                        <div className='relative w-full flex flex-col md:flex-row py-2 mt-3 mb-3 md:space-x-2'>
                            <div className='w-full flex flex-row'>
                                <div className='relative w-full flex flex-row'>
                                    {file ?
                                        null
                                        :
                                        <p className='text-xs align-middle items-center text-gray-950 mr-2 md:mr-8'>Click the button to open the image menu.</p>
                                    }
                                    {(file && imageType == 'template') ?
                                        <>
                                            <div className='w-[240px] h-12 p-1 mt-2 flex flex-row space-x-2'>
                                                <img className='w-11 h-11' alt='image' src={file} />
                                                <p className='text-xs mt-6 text-gray-950'>{reduceName(file)}</p>
                                            </div>
                                            <button onClick={removeImage} disabled={false} className='w-11 h-11 mt-3 text-sm text-center align-middle text-bg-gray-950 aspect-square rounded-lg hover:border-2 border-gray-900'>
                                                <CloseOutlined />
                                            </button>
                                        </>
                                        :
                                        <>
                                            {file ?
                                                null
                                                :
                                                <button onClick={openImages} className='w-full h-8 md:w-40 my-auto text-sm text-center align-middle bg-gray-950 text-white rounded-lg'>
                                                    Template images
                                                </button>
                                            }
                                        </>
                                    }
                                </div>
                                {/*<ImageInput disabled={file} ref={ref} label={'Cover Image'} onChange={handleImageChange} />
                                <div className='relative w-8 h-8 mt-[25px]'>
                                    {file ?
                                        <button onClick={removeImage} disabled={false} className='w-full h-full text-sm text-center align-middle text-bg-gray-950 aspect-square rounded-lg hover:border-2 border-gray-900'>
                                            <CloseOutlined />
                                        </button>
                                        :
                                        <button onClick={uploadImage} disabled={uploadLoader} className='w-full h-full text-sm text-center align-middle bg-gray-950 text-white aspect-square rounded-lg'>
                                            {!uploadLoader && <FileUploadIcon />}
                                            {uploadLoader && <CircularProgress size={14} color='#ffffff' />}
                                        </button>
                                    }
                                </div>
                                */}
                            </div>
                        </div>

                        <TextAreaInput label={'Message'} placeholder={'Enter card message'} name={'message'} value={formik?.values.message} onChange={formik?.handleChange('message')} />

                    </div>

                </div>

                <div className='w-full my-1'>
                    <Divider variant="fullWidth" sx={{ marginTop: '24px', marginBottom: '12px' }} />
                </div>

                <div className='w-full h-12 flex flex-row py-1'>
                    <div className='relative w-96 h-full flex flex-row pt-2 align-middle rounded-lg line-clamp-1'>
                        <p className='text-xs mt-2 line-clamp-1'>{link}</p>
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
                    <>

                        <div className='relative w-full h-auto flex flex-col md:flex-row py-1'>

                            <div className='relative w-full md:w-1/3 h-full'>

                                <p className="text-sm/6 text-gray-950">Senders</p>
                                <div className='w-full h-12 md:w-52 md:h-72 overflow-x-auto md:overflow-y-auto p-1 border border-gray-900 rounded-md'>
                                    <div className='flex space-x-1 md:flex-col md:space-x-0'>
                                        {messages?.map((item) => (
                                            <MessageSender key={item.message_id} selectMessage={() => selectMessage(item)}
                                                name={item.sender} messageId={messageId} selectedMessageId={item.message_id}
                                            />
                                        ))}
                                    </div>
                                </div>

                            </div>

                            <div className='relative w-full md:w-2/3 h-full flex flex-col'>
                                {cardMessagesLoading ?
                                    <MessagesPanelLoader />
                                    :
                                    <>
                                        <MessagesInput label={'Edit'} placeholder={'Message'} name={'edit message'} value={editMessage} onChange={changeEditMessage} />
                                        <div className='w-full flex flex-row'>
                                            <Tooltip title={messages?.length === 5 ? 'The maximum number of messages for this card has been reached!' : 'Click to send a message!'}>
                                                <button type='button' disabled={submitMessageLoader || messages?.length === 5} onClick={submitMessage} className='relative w-10 h-10 mt-6 mr-3 rounded-lg hover:border-2 border-gray-900'>
                                                    <AddOutlined />
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

                        <div className='w-full my-3'>
                            <Divider variant="fullWidth" sx={{ marginTop: '16px' }} />
                        </div>

                    </>
                }


                <div className='relative w-full py-4 flex flex-row'>
                    <button disabled={!file} type='submit' className={`w-36 h-10 rounded ${file ? 'bg-gray-950' : 'bg-gray-400'} py-2 px-4 text-sm mx-auto text-white data-[hover]:bg-gray-800`}>{!true ? <CircularProgress size={20} color='#ffffff' /> : 'Save Changes'}</button>
                </div>

            </form>

        </div>
    )
}

export default CardLayoutForm