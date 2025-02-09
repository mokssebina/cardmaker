//////////////---React imports---////////////////////
import React, { Fragment, useEffect, useState } from 'react';

//////////////---Headless ui imports---////////////////////
import { Button, Switch, Input } from '@headlessui/react';
import clsx from 'clsx';

//////////////---Material UI imports---///////////////
import { Skeleton, CircularProgress, Divider } from '@mui/material';

//////////////---Yup imports---////////////////////
import * as Yup from 'yup';

//////////////---Formik imports---////////////////////
import { useFormik } from 'formik';

//////////////---Formik imports---////////////////////
import { useDispatch, useSelector } from 'react-redux';

//////////////---New card screen imports---////////////////////
import TemplateHolder from '../Components/ScreenElements/TemplateElements/TemplateHolder';
import PreviewHolder from '../Components/ScreenElements/PreviewElements/PreviewHolder';
import CardLayoutForm from '../Components/ScreenElements/CardLayoutForm/CardLayoutForm';

//////////////---Data imports---////////////////////
import { messages } from '../Components/ScreenElements/MessagePage/Messages/Messages';

//////////////---Asset imports---////////////////////
import Day from '../Assets/Day.png';
import Night from '../Assets/Night.png';

//////////////---Icon imports---////////////////////
import { CopyAllOutlined } from '@mui/icons-material';

//////////////---Clipboard imports---////////////////////
import clipboard from 'clipboardy';

//////////////---Toast imports---////////////////////
import { toast } from 'react-hot-toast';

//////////////---API imports---////////////////////
import { fetchCards } from './Slices/GetCardsSlice';
import { useAuth } from '../Context/AuthContext';
import SelectItem from '../Components/ScreenElements/CardLayoutForm/SelectItem';




const NewCard = () => {

    const { session } = useAuth()
    const dispatch = useDispatch()
    const { cards, cardsLoading, getCardsError } = useSelector((state) => state.getcards);


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
    const [selectedFont, setSelectedFont] = useState('Pacifico, cursive')
    const [editMessage, setEditMessage] = useState('')
    const [selectedCard, setSelectedCard] = useState('')
    const [cardValues, setCardValues] = useState(null)

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
        console.log("form values: ", formik.values)
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

    const selectMessage = (value) => {
        setEditMessage(value)
    }

    const changeEditMessage = (e) => {
        setEditMessage(e.target.value)
    }

    useEffect(() => {
        console.log('selected: ', selected)
    }, [selected])

    useEffect(() => {
        setBlankTheme()
    }, [])

    useEffect(() => {
        dispatch(fetchCards(session.user?.id))
    }, [])

    const link = `http://localhost:3000/message/${cardId}`

    const copyLink = () => {
        clipboard.write(link)
        toast.success('Copied!')
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


    return (
        <div className='relative w-full flex flex-col space-y-3 rounded-lg p-4'>

            <div className='w-full h-24 flex flex-col py-5'>

                <p className="text-sm/6 text-gray-950">{'Select card'}</p>

                <div className='w-full h-16 flex flex-row'>
                    {cardsLoading ?
                        <div className='w-72 h-12 animate-pulse bg-slate-400 rounded'></div>
                        :
                        <select value={selectedCard} onChange={handleSelect} className='w-72 h-12 rounded-lg px-2 py-1'>
                            <option value="">--Select--</option>
                            {cards?.map((card) => (
                                <option key={card?.card_id} value={card?.card_id}>{card?.card_data.cardName}</option>
                            ))}
                        </select>
                    }
                </div>

            </div>

            {selectedCard &&
                <>
                    <CardLayoutForm formik={formik} handleChange={handleChange} backgroundDark={darkTheme}
                        lightTheme={lightTheme} setLightTheme={setLightTheme} setSelectedFont={setSelectedFont} darkTheme={darkTheme}
                        setDarkTheme={setDarkTheme} colorButtonDisabled={selected.template !== 'default'} lightText={lightText}
                        setLightText={setLightText} darkText={darkText} setDarkText={setDarkText} selectMessage={selectMessage}
                        editMessage={editMessage} changeEditMessage={changeEditMessage}
                    />

                    <div className='w-full h-20 flex flex-row py-5'>
                        <div className='w-96 h-10 flex flex-row p-1 rounded-lg line-clamp-1'>
                            <p className='line-clamp-1'>{link}</p>
                        </div>
                        <button className='w-10 h-10 rounded-lg hover:bg-slate-100' onClick={copyLink}>
                            <CopyAllOutlined />
                        </button>
                    </div>

                    <div className='w-full h-10 flex flex-row'>
                        <div className='w-1/6 pt-2'>
                            <p className="text-base text-gray-950">Templates</p>
                        </div>
                        <div className='w-5/6 py-2 flex flex-row'>
                            <p>Dark Mode</p>
                            <Switch
                                checked={!day}
                                onChange={() => setDay(!day)}
                                className="group inline-flex h-6 w-11 ml-5 items-center rounded-full bg-gray-200 transition data-[checked]:bg-gray-950"
                            >
                                <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
                            </Switch>
                        </div>
                    </div>

                    <div className='w-full flex flex-row py-4 pr-4'>

                        <div className='relative w-1/6 flex flex-col space-y-2'>
                            <TemplateHolder template={selected.template === 'default'} selectTemplate={setBlankTheme} bgImage={false} day={day} light={''} dark={''} lightColor={lightTheme} darkColor={darkTheme} />
                            <TemplateHolder template={selected.template === 'dayNight'} selectTemplate={setDayNightTheme} bgImage={true} day={day} light={Day} dark={Night} lightColor={'bg-[#cee5f0]'} darkColor={'bg-[#283038]'} />
                        </div>

                        <div className='relative w-5/6 mb-24'>
                            <PreviewHolder
                                bgImage={selected.bgImage} day={day} setDay={() => setDay(!day)} light={selected.light} dark={selected.dark} font={selectedFont}
                                bgLightColor={selected.template === 'dayNight' ? '#cee5f0' : lightTheme} bgDarkColor={selected.template === 'dayNight' ? '#283038' : darkTheme}
                                lightTextColor={lightText} darkTextColor={darkText} cardTitle={formik?.values.cardTitle} defaultLayout={defaultLayout}
                                headerLight={selected.lightColor} headerDark={selected.darkColor} introText={formik?.values.introText} birthdayMessage={formik?.values.birthdayMessage}
                                messages={messages} template={selected.template}
                            />
                        </div>

                    </div>
                </>
            }

                <button type='submit' className="fixed right-8 bottom-8 w-32 h-12 rounded bg-gray-950 py-2 px-4 text-sm mt-14 text-white data-[hover]:bg-gray-800">
                    Preview →
                </button>

        </div>
    )
}

export default NewCard