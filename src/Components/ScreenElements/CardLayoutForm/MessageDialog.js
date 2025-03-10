import React, { useState } from 'react'

//////////////---Headless ui imports---////////////////////
import { Button, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'

//////////////---Icon imports---////////////////////
import CloseIcon from '@mui/icons-material/Close';

//////////////---Nanoid imports---////////////////////
import { nanoid } from 'nanoid';

//////////////---Yup imports---////////////////////
import * as Yup from 'yup';

//////////////---Formik imports---////////////////////
import { useFormik } from 'formik';

//////////////---Redux imports---////////////////////
import { useDispatch, useSelector } from 'react-redux';

//////////////---MUI imports---////////////////////
import { CircularProgress, Tooltip } from '@mui/material';

//////////////---Screen imports---////////////////////
import MessageNameInput from '../MessagePage/Messages/MessageInput/MessageNameInput';
import MessageInput from '../MessagePage/Messages/MessageInput/MessageInput';

//////////////---API imports---////////////////////
import { submitMessage } from '../../../Pages/Slices/SubmitMessageSlice';


const MessageDialog = ({ closeSendMessage, open, sendMessageLoading, cardId }) => {

    const dispatch = useDispatch()

    const { submitMessageResponse, submitMessageLoading, submitMessageError } = useSelector((state) => state.submitmessage);
    const { messagesCheck, messagesCheckLoading, messagesCheckError } = useSelector((state) => state.messagescheck);

    let validation = Yup.object().shape({
        message: Yup.string().required('Please enter your message').typeError(),
        name: Yup.string().required('Please enter your name').typeError(),
    })

    const submitMessageFormik = useFormik({
        initialValues: {
            message: '',
            name: ''
        },
        validationSchema: validation,
        onSubmit: values => {
            let messageData = {
                message_id: nanoid(14),
                card_id: cardId,
                message: values.message,
                created_at: new Date(),
                sender: values.name
            }

            dispatch(submitMessage(messageData))
        }
    })

    return (
        <Dialog open={open} as="div" className="relative z-10 focus:outline-none" onClose={() => { }}>
            <DialogBackdrop className="fixed inset-0 bg-black/30" />
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel
                        transition
                        className="w-96 flex flex-col rounded-lg shadow-xl p-6 border backdrop-blur-2xl bg-white duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                    >
                        <div className='w-full h-9 flex flex-col'>
                            <DialogTitle as="h3" className="text-base/7 font-medium text-gray-950">
                                Send a message
                            </DialogTitle>
                            <button type='button' disabled={sendMessageLoading} onClick={closeSendMessage} className='absolute w-10 h-6 p1 right-4'>
                                <CloseIcon />
                            </button>
                        </div>

                        <form className='relative w-full mt-[10%] flex flex-grow flex-col space-y-2 mx-auto p-1' onSubmit={submitMessageFormik?.handleSubmit}>

                                <MessageInput
                                    label={'Message'}
                                    placeholder={'Enter your message'}
                                    name={'message'}
                                    value={submitMessageFormik?.values.cardName}
                                    onChange={submitMessageFormik?.handleChange('message')}
                                    touched={submitMessageFormik.touched.message}
                                    error={(submitMessageFormik.touched.message && submitMessageFormik.errors.message) && submitMessageFormik.errors.message}
                                />
                                <MessageNameInput
                                    label={'Name'}
                                    type={'text'}
                                    placeholder={'Enter your name'}
                                    name={'name'}
                                    value={submitMessageFormik?.values.cardName}
                                    onChange={submitMessageFormik?.handleChange('name')}
                                    touched={submitMessageFormik?.touched.name}
                                    error={(submitMessageFormik?.touched.name && submitMessageFormik?.errors.name) && submitMessageFormik?.errors.name}
                                />

                                <Tooltip title={messagesCheck?.length === 5 && "The maximum number of messages for this card have been sent."} arrow={true}>
                                    <div className='relative w-full'>
                                        <button disabled={messagesCheckError || messagesCheck?.length === 5 || submitMessageLoading} className={`relative w-1/2 h-14 mt-8 text-center ml-[25%] rounded ${messagesCheckError || messagesCheck?.length === 10 ? 'bg-gray-500' : 'bg-gray-900'} cursor-pointer text-white`} type='submit'>{submitMessageLoading ? <CircularProgress size={20} color='#ffffff' /> : 'Send Message'}</button>
                                    </div>
                                </Tooltip>

                        </form>

                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}

export default MessageDialog