//////////////---React imports---////////////////////
import React, { Fragment, useEffect, useState } from 'react';

//////////////---Headless ui imports---////////////////////
import { Button, Switch, Input } from '@headlessui/react';
import clsx from 'clsx';

//////////////---Material UI imports---///////////////
import { Tooltip, CircularProgress, Divider } from '@mui/material';

//////////////---Yup imports---////////////////////
import * as Yup from 'yup';

//////////////---Formik imports---////////////////////
import { useFormik } from 'formik';

//////////////---Formik imports---////////////////////
import { useDispatch, useSelector } from 'react-redux';

//////////////---Context imports---////////////////////
import { useAuth } from '../../Context/AuthContext';

//////////////---New card screen imports---////////////////////
import TemplateHolder from '../../Components/ScreenElements/TemplateElements/TemplateHolder';
import PreviewHolder from '../../Components/ScreenElements/PreviewElements/PreviewHolder';
import CardLayoutForm from '../../Components/ScreenElements/CardLayoutForm/CardLayoutForm';
import CardPreview from './CardPreview';
import ConfirmDialog from '../../Components/ScreenElements/CardLayoutForm/ConfirmDialog';
import MessageDialog from '../../Components/ScreenElements/CardLayoutForm/MessageDialog';

//////////////---Data imports---////////////////////
import { fontList } from '../../Components/ScreenElements/CardLayoutForm/FontList';
import { messages } from '../../Components/ScreenElements/MessagePage/Messages/Messages';

//////////////---Asset imports---////////////////////
import Day from '../../Assets/Day.png'
import Night from '../../Assets/Night.png';

//////////////---Icon imports---////////////////////
import { CopyAllOutlined, AddIcon } from '@mui/icons-material';

//////////////---Clipboard imports---////////////////////
import clipboard from 'clipboardy';

//////////////---Toast imports---////////////////////
import { toast } from 'react-hot-toast';

//////////////---API imports---////////////////////
import { fetchCards } from '../Slices/GetCardsSlice';
import { getCardMessages } from '../Slices/GetMessagesSlice';
import { updateCardMessage } from '../Slices/UpdateMessageSlice';
import { deleteCardMessage } from '../Slices/DeleteMessageSlice';



const NewCard = () => {

    const { session, preview, togglePreview } = useAuth()
    const dispatch = useDispatch()
    const { cards, cardsLoading, getCardsError } = useSelector((state) => state.getcards);
    const { cardMessages, cardMessagesLoading, getCardMessagesError } = useSelector((state) => state.getcardmessages);
    const { updatedMessage, updatedMessageLoading, updatedMessageError } = useSelector((state) => state.updatemessage);
    const { deletedMessage, deletedMessageLoading, deletedMessageError } = useSelector((state) => state.deletemessage);
    const { submitMessageResponse, submitMessageLoading, submitMessageError } = useSelector((state) => state.submitmessage);


    const [day, setDay] = useState(true)
    const [selected, setSelected] = useState({
        template: 'default',
        bgImage: false,
        light: '',
        dark: '',
        lightTextColor: '#ffffff',
        darkTextColor: '#030712',
        lightColor: '',
        darkColor: ''
    })
    const [cardTitle, setCardTitle] = useState('')
    const [defaultLayout, setDefaultLayout] = useState(true)
    const [cardId, setCardId] = useState('')
    const [file, setFile] = useState(null);
    const [lightTheme, setLightTheme] = useState('#ffffff')
    const [darkTheme, setDarkTheme] = useState('#030712')
    const [lightText, setLightText] = useState('#ffffff')
    const [darkText, setDarkText] = useState('#030712')
    const [selectedFont, setSelectedFont] = useState('')
    const [editMessage, setEditMessage] = useState('')
    const [selectedCard, setSelectedCard] = useState('')
    const [cardValues, setCardValues] = useState(null)
    const [fontId, setFontId] = useState('')
    const [messageId, setMessageId] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [open, setOpen] = useState(false)


    const handleSelect = (event) => {

        let data = event.target.value
        setSelectedCard(data);

        let findCard = cards.filter((item) => (item.card_id === data))

        setCardId(findCard[0]?.card_id)

        setCardValues(findCard[0]?.card_data)

    };

    let validation = Yup.object().shape({
        cardName: Yup.string().required(),
        cardTitle: Yup.string().required(),
        introText: Yup.string().required(),
        coverText: Yup.string().required(),
        birthdayMessage: Yup.string().required(),
    })

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            template: cardValues?.template,
            cardName: cardValues?.cardName,
            cardTitle: cardValues?.cardTitle,
            lightTheme: cardValues?.lightTheme,
            darkTheme: cardValues?.darkTheme,
            titleFont: cardValues?.selectedFont,
            introText: cardValues?.introText,
            coverImage: cardValues?.coverImage,
            lightText: cardValues?.lightText,
            darkText: cardValues?.darkText,
            birthdayMessage: cardValues?.birthdayMessage,
            messages: cardValues?.messages
        },
        validationSchema: validation,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        }
    });

    const setBlankTheme = () => {
        setSelected({
            ...selected,
            template: 'default',
            bgImage: false,
            light: '',
            dark: '',
            lightTextColor: '#ffffff',
            darkTextColor: '#030712',
            lightColor: '',
            darkColor: ''
        })
    }

    const setDayNightTheme = () => {
        setSelected({
            ...selected,
            template: 'dayNight',
            bgImage: true,
            light: Day,
            dark: Night,
            lightTextColor: '',
            darkTextColor: '',
            lightColor: '#cee5f0',
            darkColor: '#283038'
        })
        console.log("form values: ", formik.values)
    }

    const handleChange = (e) => {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    const selectFont = (value) => {
        setFontId(value.id)
        setSelectedFont(value.fontFamily)
    }

    const selectMessage = (value) => {
        //console.log("selected value: ", value)
        setEditMessage(value?.message)
        setMessageId(value?.message_id)
    }

    const changeEditMessage = (e) => {
        setEditMessage(e.target.value)
    }

    const cardMessageUpdate = () => {
        //console.log('updated message')
        let data = {
            message: editMessage,
            id: messageId
        }
        dispatch(updateCardMessage(data))
    }

    useEffect(() => {
        setBlankTheme()
    }, [])

    useEffect(() => {
        if (!cards) {
            dispatch(fetchCards(session.user?.id))
        }
    }, [])

    useEffect(() => {
        if (cardId) {
            dispatch(() => {
                dispatch(getCardMessages(cardId))
            })
        }
    }, [cardId])

    useEffect(() => {
        if (getCardMessagesError) {
            toast.error(getCardMessagesError)
        }
    }, [getCardMessagesError])

    useEffect(() => {
        if (fontList) {
            setFontId(fontList[0]?.id)
            setSelectedFont(fontList[0]?.fontFamily)
        }
    }, [])

    useEffect(() => {
        if (cardMessages) {
            setEditMessage(cardMessages[0]?.message)
            setMessageId(cardMessages[0]?.message_id)
        }
    }, [cardMessages])

    useEffect(() => {
        if (updatedMessage?.length > 0) {
            //console.log('update response: ', updatedMessage)
            toast.success('The message has been updated!')
            dispatch(getCardMessages(cardId))
        }
    }, [updatedMessage])

    useEffect(() => {
        if (updatedMessageError) {
            toast.error(updatedMessageError)
        }
    }, [updatedMessageError])

    useEffect(() => {
        if (deletedMessage) {
            setIsOpen(false)
            toast.success('The message was deleted!')
            dispatch(getCardMessages(cardId))
        }
    }, [deletedMessage])

    useEffect(() => {
        if (deletedMessageError) {
            setIsOpen(false)
            toast.error(deletedMessageError)
        }
    }, [deletedMessageError])

    useEffect(() => {
        if (submitMessageResponse) {
            setOpen(false)
            toast.success('Your message has been sent.')
            dispatch(getCardMessages(cardId))
        }
    }, [submitMessageResponse])

    useEffect(() => {
        if (submitMessageError) {
            setOpen(false)
            toast.error(submitMessageError)
        }
    }, [submitMessageError])

    const cardlink = `http://localhost:3000/card/${cardId}`
    const previewlink = `http://localhost:3000/preview/${cardId}`
    const link = `http://localhost:3000/message/${cardId}`

    const copyLink = (value) => {
        clipboard.write(value)
        toast.success('Copied!')
    }
    const openPreview = () => {
        window.open(previewlink)
    }

    useEffect(() => {
        if (cards && cardValues) {
            setLightTheme(cardValues?.lightTheme)
            setDarkTheme(cardValues?.darkTheme)
            setLightText(cardValues?.lightText)
            setDarkText(cardValues?.darkText)
            setSelectedFont(cardValues?.titleFont)
        }
    }, [cards, cardValues])

    useEffect(() => {
        console.log("preview state: ", preview)
    }, [preview])

    const confirm = () => {
        dispatch(deleteCardMessage(messageId))
    }

    const closeConfirm = () => {
        setIsOpen(false)
    }

    const closeSendMessage = () => {
        setOpen(false)
    }


    return (
        <>
            <MessageDialog cardId={cardId} open={open} closeSendMessage={closeSendMessage} sendMessageLoading={submitMessageLoading} />
            <ConfirmDialog isOpen={isOpen} confirm={confirm} closeConfirm={closeConfirm} deletedMessageLoading={deletedMessageLoading} />
            {!preview ?
                <div className='relative w-full flex flex-col space-y-3 rounded-lg p-4'>

                    <div className='w-full h-24 flex flex-col py-5'>

                        <p className="text-sm/6 text-gray-950">{'Select card'}</p>

                        <div className='w-full h-16 flex flex-row'>

                            <div className='relative w-1/3 h-full py-1'>
                                {cardsLoading ?
                                    <div className='w-80 h-12 animate-pulse bg-slate-400 rounded'></div>
                                    :
                                    <select value={selectedCard} onChange={handleSelect} className='w-80 h-12 rounded-lg px-2 py-1'>
                                        <option value="">--Select--</option>
                                        {cards?.map((card) => (
                                            <option key={card?.card_id} value={card?.card_id}>{card?.card_data.cardName}</option>
                                        ))}
                                    </select>
                                }
                            </div>

                            <div className='relative w-2/3 h-full py-1 flex flex-row'>
                                {selectedCard &&
                                    <>
                                        <div className='w-96 h-12 flex flex-row pt-2 rounded-lg line-clamp-1'>
                                            <p className='line-clamp-1'>{cardlink}</p>
                                        </div>
                                        <Tooltip title={'Click here to copy the link and share with the recipient, friends and loved ones!'}>
                                            <button className='w-10 h-10 rounded-lg hover:border-2 border-gray-900' onClick={() => copyLink(cardlink)}>
                                                <CopyAllOutlined />
                                            </button>
                                        </Tooltip>
                                    </>
                                }
                            </div>

                        </div>

                    </div>

                    {selectedCard &&
                        <>
                            <div className='w-full my-3'>
                                <Divider variant="fullWidth" sx={{ marginTop: '16px' }} />
                            </div>

                            <div className='w-full h-28 flex flex-row p-1'>
                                <TemplateHolder template={selected.template === 'default'} selectTemplate={setBlankTheme} bgImage={false} day={day} light={''} dark={''} lightColor={lightTheme} darkColor={darkTheme} />
                                <TemplateHolder template={selected.template === 'dayNight'} selectTemplate={setDayNightTheme} bgImage={true} day={day} light={Day} dark={Night} lightColor={'bg-[#cee5f0]'} darkColor={'bg-[#283038]'} />
                            </div>

                            <div className='w-full my-3'>
                                <Divider variant="fullWidth" />
                            </div>


                            <CardLayoutForm formik={formik} handleChange={handleChange} backgroundDark={darkTheme}
                                lightTheme={lightTheme} setLightTheme={setLightTheme} selectFont={selectFont} darkTheme={darkTheme}
                                setDarkTheme={setDarkTheme} colorButtonDisabled={selected.template !== 'default'} lightText={lightText}
                                setLightText={setLightText} darkText={darkText} setDarkText={setDarkText} messages={cardMessages}
                                selectMessage={selectMessage} editMessage={editMessage} changeEditMessage={changeEditMessage} messageId={messageId}
                                updatedMessageLoader={updatedMessageLoading} updateCardMessage={cardMessageUpdate} selectedFont={selectedFont}
                                fontId={fontId} link={link} copyLink={copyLink} deleteCardMessage={() => setIsOpen(true)} submitMessage={() => setOpen(true)}
                                submitMessageLoader={submitMessageLoading} cardMessagesLoading={cardMessagesLoading}
                            />

                        </>
                    }

                    {cardValues &&
                        <button onClick={() => togglePreview()} type='submit' className="fixed right-8 bottom-8 w-32 h-12 rounded bg-gray-950 py-2 px-4 text-sm mt-14 text-white data-[hover]:bg-gray-800">
                            Preview →
                        </button>
                    }

                </div>
                :
                <CardPreview
                    lightTheme={selected.template === 'dayNight' ? '#cee5f0' : lightTheme}
                    darkTheme={selected.template === 'dayNight' ? '#283038' : darkTheme}
                    template={selected.bgImage} cardTitle={formik?.values.cardTitle}
                    lightText={lightText} darkText={darkText} titleFont={selectedFont}
                    introText={formik?.values.introText} coverImage={file} messages={cardMessages}
                    birthdayMessage={formik?.values.birthdayMessage}
                />
            }
        </>
    )
}

export default NewCard