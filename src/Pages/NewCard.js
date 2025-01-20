import React, { Fragment, useEffect, useState } from 'react';
import { Button, Switch, Input } from '@headlessui/react';
import clsx from 'clsx';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import TemplateHolder from '../Components/ScreenElements/TemplateElements/TemplateHolder';
import PreviewHolder from '../Components/ScreenElements/PreviewElements/PreviewHolder';
import Day from '../Assets/Day.png';
import Night from '../Assets/Night.png';
import CardLayoutForm from '../Components/ScreenElements/CardLayoutForm/CardLayoutForm';




const NewCard = () => {


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
    const [file, setFile] = useState(null);
    const [lightTheme, setLightTheme] = useState('#ffffff')
    const [darkTheme, setDarkTheme] = useState('#030712')
    const [lightText, setLightText] = useState('#ffffff')
    const [darkText, setDarkText] = useState('#030712')
    const [selectedFont, setSelectedFont] = useState('Pacifico, cursive')

    const formik = useFormik({
        initialValues: {
            cardName: '',
            cardTitle: 'happy birthday',
            titleFont: selectedFont,
            introText: '',
            coverText: '',
            coverImage: null,
            message: ''
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        }
    });

    let validation = Yup.object().shape({
        cardName: Yup.string().required(),
        cardTitle: Yup.string().required(),
        introText: Yup.string().required(),
        coverText: Yup.string().required(),
        birthdayMessage: Yup.string().required(),
    })

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

    const pickFont = (value) => {
        setSelectedFont(value)
    }

    useEffect(() => {
        console.log('selected: ', selected)
    }, [selected])

    useEffect(() => {
        setBlankTheme()
    }, [])

    useEffect(() => {
        console.log("selected font: ",selectedFont)
    },[selectedFont])


    return (
        <div className='relative w-full h-full flex flex-col space-y-3 rounded-lg p-4'>

            <CardLayoutForm formik={formik} validation={validation} handleChange={handleChange} backgroundDark={darkTheme}
                lightTheme={lightTheme} setLightTheme={setLightTheme} setSelectedFont={setSelectedFont}
                darkTheme={darkTheme} setDarkTheme={setDarkTheme} colorButtonDisabled={selected.template !== 'default'}
                lightText={lightText} setLightText={setLightText} darkText={darkText} setDarkText={setDarkText}
            />

            <div className='w-full h-10 flex flex-row'>
                <div className='w-1/6'></div>
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

            <div className='w-full h-auto flex flex-row'>

                <div className='relative w-1/6 flex flex-col space-y-2'>
                    <TemplateHolder selectTemplate={setBlankTheme} bgImage={false} day={day} light={''} dark={''} lightColor={selected.lightColor} darkColor={selected.darkColor} />
                    <TemplateHolder selectTemplate={setDayNightTheme} bgImage={true} day={day} light={Day} dark={Night} lightColor={'bg-[#cee5f0]'} darkColor={'bg-[#283038]'} />
                </div>

                <div className='relative w-5/6 h-auto mb-24'>
                    <PreviewHolder
                        bgImage={selected.bgImage} day={day} setDay={() => setDay(!day)} light={selected.light} dark={selected.dark} font={selectedFont}
                        bgLightColor={selected.template === 'dayNight' ? '#cee5f0' : lightTheme} bgDarkColor={selected.template === 'dayNight' ? '#283038' : darkTheme}
                        lightTextColor={lightText} darkTextColor={darkText} cardTitle={formik?.values.cardTitle} defaultLayout={defaultLayout}
                        headerLight={selected.lightColor} headerDark={selected.darkColor} introText={formik?.values.introText} birthdayMessage={formik?.values.message}
                    />
                </div>

            </div>

        </div>
    )
}

export default NewCard