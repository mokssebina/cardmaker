import React from 'react'
import { Formik, useFormik } from 'formik'
import Header from '../Components/ScreenElements/Messages/Header'
import InputText from '../Components/ScreenElements/CardLayoutForm/InputText'
import TextAreaInput from '../Components/ScreenElements/CardLayoutForm/TextAreaInput'

const MessageForm = () => {

    const messageFormik = useFormik({
        initialValues: {
            message: '',
            name: ''
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        }
    })

  return (
    <div className='relative w-screen h-screen flex flex-col p-4'>
        <Header />
        <form className='relative w-96 flex flex-grow flex-col space-y-2 mx-auto justify-center items-center p-1' onSubmit={messageFormik?.handleSubmit}>
            <TextAreaInput label={'Message'} placeholder={'Enter your message'} name={'message'} value={messageFormik?.values.cardName} onChange={messageFormik?.handleChange('message')} />
            <InputText label={'Name'} placeholder={'Enter your name'} name={'name'} value={messageFormik?.values.cardName} onChange={messageFormik?.handleChange('name')} />
            <button className='w-1/2 h-14 mt-8 text-center mx-auto bg-gray-900 cursor-pointer text-white' type='submit'>Send</button>
        </form>
    </div>
  )
}

export default MessageForm