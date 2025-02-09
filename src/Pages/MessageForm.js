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
import { CircularProgress } from '@mui/material';

//////////////---Screen imports---////////////////////
import Header from '../Components/ScreenElements/MessagePage/Header'
import MessageNameInput from '../Components/ScreenElements/MessagePage/Messages/MessageInput/MessageNameInput';
import TextAreaInput from '../Components/ScreenElements/CardLayoutForm/TextAreaInput'

//////////////---API imports---////////////////////
import { submitMessage } from '../Components/ScreenElements/MessagePage/Messages/SubmitMessageSlice';




const MessageForm = () => {

    const dispatch = useDispatch()
    const { submitMessageResponse, submitMessageLoading, submitMessageError } = useSelector((state) => state.submitmessage);

    const { card_id } = useParams()
    console.log("card id: ", card_id)

    const messageFormik = useFormik({
        initialValues: {
            message: '',
            name: ''
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
            dispatch(submitMessage({}))
        }
    })

    useEffect(() => {
        if (submitMessageResponse) {
            toast.success('Your message has been sent.')
        }
    }, [submitMessageResponse])

    useEffect(() => {
        if (submitMessageError) {
            toast.error(submitMessageError)
        }
    }, [submitMessageError])



    return (
        <div className='relative w-screen h-screen flex flex-col p-4'>

            <Header />

            <form className='relative w-96 mt-[10%] flex flex-grow flex-col space-y-2 mx-auto p-1' onSubmit={messageFormik?.handleSubmit}>

                <TextAreaInput label={'Message'} placeholder={'Enter your message'} name={'message'} value={messageFormik?.values.cardName} onChange={messageFormik?.handleChange('message')} />
                <MessageNameInput label={'Name'} type={'text'} placeholder={'Enter your name'} name={'name'} value={messageFormik?.values.cardName} onChange={messageFormik?.handleChange('name')} />

                <div className='relative w-full'>
                    <button className='relative w-1/2 h-14 mt-8 text-center ml-[25%] rounded bg-gray-900 cursor-pointer text-white' type='submit'>{submitMessageLoading ? <CircularProgress size={20} color='#ffffff' /> : 'Send Message'}</button>
                </div>

            </form>

        </div>
    )
}

export default MessageForm