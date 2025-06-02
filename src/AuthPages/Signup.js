import React, { useEffect } from 'react'

//////////////---Navigation imports---////////////////////
import { useNavigate } from 'react-router-dom'

//////////////---Screen imports---////////////////////
import AuthInput from './AuthComponents/AuthInput'

//////////////---Formik imports---////////////////////
import { Formik, useFormik } from 'formik'

//////////////---Headless UI imports---////////////////////
import { Button } from '@headlessui/react'

//////////////---Material UI imports---////////////////////
import { CircularProgress } from '@mui/material'

//////////////---Context imports---////////////////////
import { useAuth } from '../Context/AuthContext'

//////////////---Validation imports---////////////////////
import * as Yup from 'yup'



const Signup = () => {

    const { loading, signUpWithEmail } = useAuth()
    const navigate = useNavigate()

    let validation = Yup.object().shape({
        firstName: Yup.string().required(),
        lastName: Yup.string().required(),
        username: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required()
    })

    const authSignipFormik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            password: ''
        },
        validationSchema: validation,
        onSubmit: values => {
            //alert(JSON.stringify(values, null, 2));
            signUpWithEmail(values.firstName, values.lastName, values.username, values.email, values.password)
        }
    })

    return (
        <div className='w-screen h-screen flex flex-col'>

            <form onSubmit={authSignipFormik.handleSubmit} className='relative w-full md:w-[350px] lg:w-[500px] flex flex-col m-auto py-16 px-[90px] space-y-3 border border-gray-950 rounded-lg'>

                <div className='w-44 h-16 bg-slate-500 mx-auto mb-9'></div>

                <AuthInput
                    label={'First name'}
                    type={'firstName'}
                    placeholder={'Enter your first name'}
                    name={'firstName'}
                    value={authSignipFormik?.values.firstName}
                    onChange={authSignipFormik?.handleChange('firstName')}
                    touched={authSignipFormik?.touched.firstName}
                    error={(authSignipFormik.touched.firstName && authSignipFormik.errors.firstName) && authSignipFormik.errors.firstName}
                />

                <AuthInput
                    label={'Last name'}
                    type={'lastName'}
                    placeholder={'Enter your last name'}
                    name={'lastName'}
                    value={authSignipFormik?.values.lastName}
                    onChange={authSignipFormik?.handleChange('lastName')}
                    touched={authSignipFormik?.touched.lastName}
                    error={(authSignipFormik.touched.lastName && authSignipFormik.errors.lastName) && authSignipFormik.errors.lastName}
                />

                <AuthInput
                    label={'Username'}
                    type={'username'}
                    placeholder={'Enter your username'}
                    name={'username'}
                    value={authSignipFormik?.values.username}
                    onChange={authSignipFormik?.handleChange('username')}
                    touched={authSignipFormik?.touched.username}
                    error={(authSignipFormik.touched.username && authSignipFormik.errors.username) && authSignipFormik.errors.username}
                />

                <AuthInput
                    label={'Email'}
                    type={'email'}
                    placeholder={'Enter your email'}
                    name={'email'}
                    value={authSignipFormik?.values.email}
                    onChange={authSignipFormik?.handleChange('email')}
                    touched={authSignipFormik?.touched.email}
                    error={(authSignipFormik.touched.email && authSignipFormik.errors.email) && authSignipFormik.errors.email}
                />

                <AuthInput
                    label={'Password'}
                    type={'password'}
                    placeholder={'Enter your password'}
                    name={'password'}
                    value={authSignipFormik?.values.password}
                    onChange={authSignipFormik?.handleChange('password')}
                    touched={authSignipFormik?.touched.password}
                    error={(authSignipFormik.touched.password && authSignipFormik.errors.password) && authSignipFormik.errors.password}
                />

                <button type='submit' className="relative w-full sm:w-80 h-12 mx-auto rounded bg-gray-950 py-2 px-4 text-sm mt-14 text-white data-[hover]:bg-gray-800">
                    {loading ? <CircularProgress size={20} color='#ffffff' /> : 'Continue →'}
                </button>

                <div className='w-full flex flex-row mt-4'>
                    <p className='text-sm mr-1'>Already have an account?</p>
                    <p onClick={() => navigate('/signin')} className='text-sm text-blue-700 hover:underline cursor-pointer'>Signin here.</p>
                </div>

            </form>

        </div>
    )
}

export default Signup