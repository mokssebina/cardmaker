import React, { useEffect, useState } from 'react'

//////////////---Navigation imports---////////////////////
import { useNavigate } from 'react-router-dom'

//////////////---Headless UI imports---////////////////////
import { Button } from '@headlessui/react'

//////////////---Material UI imports---////////////////////
import { CircularProgress } from '@mui/material'

//////////////---Redux imports---////////////////////
import { useDispatch, useSelector } from 'react-redux';

//////////////---Toast imports---////////////////////
import { toast } from 'react-hot-toast'

//////////////---Screen imports---////////////////////
import AuthInput from './AuthComponents/AuthInput'

//////////////---Context imports---////////////////////
import { useAuth } from '../Context/AuthContext'

//////////////---Formik imports---////////////////////
import { Formik, useFormik } from 'formik'

//////////////---Validation imports---////////////////////
import * as Yup from 'yup'

//////////////---OTP imports---////////////////////
import VerifyOtp from './VerifyOtp'

//////////////---API imports---////////////////////
import { resetSigninUser, signInUser } from './SigninSlice.js/signInSlice'




const Signin = () => {

    const { loading, signInWithEmail } = useAuth()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { signinLoader, signinData, signinErrorMessage, signinStatusCode } = useSelector(state => state.signin)

    const [show, setShow] = useState(false)

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
            console.log()
            let userDetails = {
                userEmail: values.email,
                userPassword: values.password
            }
            dispatch(signInUser(userDetails))
        }
    })

    const handleChange = () => {
        console.log("pressed value: ", show)
        setShow(!show)
      }

    useEffect(() => {
        if (signinErrorMessage) {
            toast.error(signinErrorMessage)
        }
        return () => dispatch(resetSigninUser())
    }, [signinErrorMessage])

    return (
        <div className='w-screen h-screen flex flex-col p-2'>

            <form onSubmit={authFormik.handleSubmit} className='relative w-full md:w-[350px] lg:w-[500px] flex flex-col m-auto py-16 px-4 lg:px-[90px] space-y-3 border border-gray-950 rounded-lg'>

                <div className='w-44 h-16 bg-slate-500 mx-auto mb-9'></div>

                <AuthInput label={'Email'} type={'email'} placeholder={'Enter your email'} name={'email'} value={authFormik?.values.email} onChange={authFormik?.handleChange('email')} />

                <AuthInput label={'Password'} type={show ? 'text' : 'password'} placeholder={'Enter your password'} name={'password'} value={authFormik?.values.password} onChange={authFormik?.handleChange('password')} />

                <div className='w-full h-5 mt-3 mb-3 flex flex-row space-x-4'>
                    <input disabled={!authFormik?.values.password} className='w-5 h-5' type='checkbox' checked={show} onChange={handleChange} />
                    <p className='text-sm font-semibold ml-3'>Show password</p>
                </div>

                <button type='submit' className="w-full sm:w-80 h-12 mx-auto rounded bg-gray-950 py-2 px-4 text-sm mt-14 text-white data-[hover]:bg-gray-800">
                    {signinLoader ? <CircularProgress size={20} color='#ffffff' /> : 'Continue →'}
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