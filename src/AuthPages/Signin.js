import React from 'react'
import InputText from '../Components/ScreenElements/CardLayoutForm/InputText'
import { Formik, useFormik } from 'formik'
import { Button } from '@headlessui/react'
import * as Yup from 'yup'



const Signin = () => {

    const authFormik = useFormik({
        initialValues: {
            email: ''
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        }
    })

    let validation = Yup.object().shape({
        cardName: Yup.string().required()
    })

    return (
        <div className='w-screen h-screen flex flex-col'>

            <div className='relative w-[500px] flex flex-col m-auto py-16 px-[90px] space-y-3 border border-gray-950 rounded-lg'>

                <InputText label={'Email'} placeholder={'Enter your email'} name={'email'} value={authFormik?.values.cardName} onChange={authFormik?.handleChange('email')} />
                
                <Button className="w-full rounded bg-gray-950 py-2 px-4 text-sm mt-14 text-white data-[hover]:bg-gray-800">
                    Continue →
                </Button>

            </div>

        </div>
    )
}

export default Signin