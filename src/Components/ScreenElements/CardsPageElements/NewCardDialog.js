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
import { createCard } from '../../../Pages/Slices/CreateCard';


const NewCardDialog = ({ open, setOpen, userId }) => {

    const dispatch = useDispatch()

    const { createCardData, createCardLoading, createCardError } = useSelector((state) => state.createcard);

    let validation = Yup.object().shape({
        cardName: Yup.string().required('Please enter your page name').typeError(),
        cardTitle: Yup.string().required('Please enter your page title').typeError(),
    })

    const newCardFormik = useFormik({
        initialValues: {
            cardName: '',
            cardTitle: ''
        },
        validationSchema: validation,
        onSubmit: values => {
            const postId = nanoid(14)
            let pageData = {
                cardName: values?.cardName,
                cardTitle: values?.cardTitle,
                userId: userId,
                postId: postId,
                type: 'paid',
            }

            dispatch(createCard(pageData))
            newCardFormik?.resetForm()
        }
    })

    const closeDialog = () => {
        setOpen()
        newCardFormik?.resetForm()
    }

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
                                Create a new card
                            </DialogTitle>
                            <button type='button' disabled={createCardLoading} onClick={closeDialog} className='absolute w-10 h-6 p1 right-4'>
                                <CloseIcon />
                            </button>
                        </div>

                        <form className='relative w-full mt-[10%] flex flex-grow flex-col space-y-2 mx-auto p-1' onSubmit={newCardFormik?.handleSubmit}>

                            <MessageNameInput
                                label={'Card name'}
                                type={'text'}
                                placeholder={'Give the page a name'}
                                name={'cardName'}
                                value={newCardFormik?.values.cardName}
                                onChange={newCardFormik?.handleChange('cardName')}
                                touched={newCardFormik?.touched.cardName}
                                error={(newCardFormik?.touched.cardName && newCardFormik?.errors.cardName) && newCardFormik?.errors.cardName}
                            />

                            <MessageNameInput
                                label={'Card title'}
                                type={'text'}
                                placeholder={'Give the page a title'}
                                name={'cardTitle'}
                                value={newCardFormik?.values.cardTitle}
                                onChange={newCardFormik?.handleChange('cardTitle')}
                                touched={newCardFormik?.touched.cardTitle}
                                error={(newCardFormik?.touched.cardTitle && newCardFormik?.errors.cardTitle) && newCardFormik?.errors.cardTitle}
                            />

                            <div className='relative w-full'>
                                <button disabled={createCardLoading} className={`relative w-1/2 h-14 mt-8 text-center ml-[25%] rounded cursor-pointer bg-gray-900 text-white`} type='submit'>{createCardLoading ? <CircularProgress size={20} color='#ffffff' /> : 'Create Page'}</button>
                            </div>

                        </form>

                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}

export default NewCardDialog