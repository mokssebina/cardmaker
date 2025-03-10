import React, { useEffect } from 'react'

//////////////---Router imports---////////////////////
import { useParams } from 'react-router-dom'

//////////////---Toast imports---////////////////////
import { toast } from 'react-hot-toast'

//////////////---Yup imports---////////////////////
import * as Yup from 'yup';

//////////////---Formik imports---////////////////////
import { useFormik } from 'formik';

//////////////---Redux imports---////////////////////
import { useDispatch, useSelector } from 'react-redux';

//////////////---MUI imports---////////////////////
import { CircularProgress, Tooltip } from '@mui/material';

//////////////---Screen imports---////////////////////
import Header from '../../Components/ScreenElements/MessagePage/Header'
import MessageNameInput from '../../Components/ScreenElements/MessagePage/Messages/MessageInput/MessageNameInput';
import MessageInput from '../../Components/ScreenElements/MessagePage/Messages/MessageInput/MessageInput';
import MessageFormLoader from './MessageFormLoader';

//////////////---API imports---////////////////////
import { submitMessage } from '../Slices/SubmitMessageSlice';
import { getMessagesCheck } from '../Slices/CheckMessagesSlice';

//////////////---Nanoid imports---////////////////////
import { nanoid } from 'nanoid';

//////////////---Moment imports---////////////////////
import moment from 'moment';




const MessageForm = () => {

    const dispatch = useDispatch()
    const { submitMessageResponse, submitMessageLoading, submitMessageError } = useSelector((state) => state.submitmessage);
    const { messagesCheck, messagesCheckLoading, messagesCheckError } = useSelector((state) => state.messagescheck);

    const { card_id } = useParams()
    console.log("card id: ", card_id)

    useEffect(() => {
        dispatch(getMessagesCheck(card_id))
    }, [])

    let validation = Yup.object().shape({
        message: Yup.string().required('Please enter your message').typeError(),
        name: Yup.string().required('Please enter your name').typeError(),
    })

    const messageFormik = useFormik({
        initialValues: {
            message: '',
            name: ''
        },
        validationSchema: validation,
        onSubmit: values => {
            let messageData = {
                message_id: nanoid(14),
                card_id: card_id,
                message: values.message,
                created_at: new Date(),
                sender: values.name
            }

            dispatch(submitMessage(messageData))
        }
    })

    useEffect(() => {
        if (submitMessageResponse) {
            toast.success('Your message has been sent.')
        }
        messageFormik?.handleReset()
    }, [submitMessageResponse])

    useEffect(() => {
        if (submitMessageError) {
            toast.error(submitMessageError)
        }
    }, [submitMessageError])



    return (
        <div className='relative w-screen h-screen flex flex-col p-4'>

            <Header />

            {messagesCheckLoading && <MessageFormLoader />}

            {!messagesCheckLoading &&
                <form className='relative w-96 mt-[10%] flex flex-grow flex-col space-y-2 mx-auto p-1' onSubmit={messageFormik?.handleSubmit}>

                    <>
                        <MessageInput
                            label={'Message'}
                            placeholder={'Enter your message'}
                            name={'message'}
                            value={messageFormik?.values.cardName}
                            onChange={messageFormik?.handleChange('message')}
                            touched={messageFormik.touched.message}
                            error={(messageFormik.touched.message && messageFormik.errors.message) && messageFormik.errors.message}
                        />
                        <MessageNameInput
                            label={'Name'}
                            type={'text'}
                            placeholder={'Enter your name'}
                            name={'name'}
                            value={messageFormik?.values.cardName}
                            onChange={messageFormik?.handleChange('name')}
                            touched={messageFormik.touched.name}
                            error={(messageFormik.touched.name && messageFormik.errors.name) && messageFormik.errors.name}
                        />

                        <Tooltip title={messagesCheck?.length === 5 && "The maximum number of messages for this card have been sent."} arrow={true}>
                            <div className='relative w-full'>
                                <button disabled={messagesCheckError || messagesCheck?.length === 5} className={`relative w-1/2 h-14 mt-8 text-center ml-[25%] rounded ${messagesCheckError || messagesCheck?.length === 10 ? 'bg-gray-500' : 'bg-gray-900'} cursor-pointer text-white`} type='submit'>{submitMessageLoading ? <CircularProgress size={20} color='#ffffff' /> : 'Send Message'}</button>
                            </div>
                        </Tooltip>
                    </>

                </form>
            }


        </div>
    )
}

export default MessageForm