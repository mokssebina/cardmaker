import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import InputText from '../Components/ScreenElements/CardLayoutForm/InputText'
import { Formik, useFormik } from 'formik'
import { Button } from '@headlessui/react'
import { CircularProgress } from '@mui/material'
import { useAuth } from '../Context/AuthContext'
//import { Button } from '@mui/material'
import * as Yup from 'yup'



const Signin = () => {

    const {loading, signInWithEmail} = useAuth()
    const navigate = useNavigate()

    let validation = Yup.object().shape({
        email: Yup.string().required(),
        password: Yup.string().required()
    })

    const authFormik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: validation,
        onSubmit: values => {
            //alert(JSON.stringify(values, null, 2));
            signInWithEmail(values.email, values.password)
        }
    })

    return (
        <div className='w-screen h-screen flex flex-col'>

            <form onSubmit={authFormik.handleSubmit} className='relative w-[500px] flex flex-col m-auto py-16 px-[90px] space-y-3 border border-gray-950 rounded-lg'>

                <div className='w-44 h-16 bg-slate-500 mx-auto mb-9'></div>

                <InputText label={'Email'} type={'email'} placeholder={'Enter your email'} name={'email'} value={authFormik?.values.email} onChange={authFormik?.handleChange('email')} />

                <InputText label={'Password'} type={'password'} placeholder={'Enter your password'} name={'password'} value={authFormik?.values.password} onChange={authFormik?.handleChange('password')} />
                
                <button type='submit' className="w-full h-12 rounded bg-gray-950 py-2 px-4 text-sm mt-14 text-white data-[hover]:bg-gray-800">
                    {loading? <CircularProgress size={20} color='#ffffff' /> : 'Continue →'}
                </button>
                
                <div className='w-full flex flex-row mt-4'>
                    <p className='text-sm mr-1'>Don't have an account?</p>
                    <p onClick={() => navigate('/signup')} className='text-sm text-blue-700 hover:underline cursor-pointer'>Signup here.</p>
                </div>

            </form>

        </div>
    )
}

export default Signin