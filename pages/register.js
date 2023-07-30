import Head from 'next/head'
import Layout from '../layout/layout'
import Link from 'next/link'
import styles from '../styles/Form.module.css'
import Image from 'next/image'
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import { useState } from 'react'
import { useFormik } from 'formik'
import { registerValidate } from '../lib/validate'
import {useRouter} from 'next/router'

export default function Register(){
    const [show,setShow] = useState({password: false, cpassword: false})
    const router = useRouter()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            cpassword: ''
        },
        validate: registerValidate,
        onSubmit
    })

async function onSubmit(values){
    const options = {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(values)
    }

    await fetch("https://resumegpt-rho.vercel.app/api/auth/signup", options)
    .then(res => res.json())
    .then((data) => {

        if(data) router.push("http://localhost:3000/home")

    })
}

    return (

        <Layout>

            <Head>
                <title>Register</title>
            </Head>
        <section className='w-3/4 mx-auto flex flex-col gap-10'>
            <div className="title">
                {/* <h1 className='text-gray-800 text-4xl font-bold py-4'>Register</h1> */}
                <p className='w-3/4 mx-auto text-black font-bold'>Resgiter to access AI Resume Tailoring</p>
            </div>

            <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
                {/* Input fields */}
                <div className={styles.input_group}>
                    <input
                    type="email"
                    name="email"
                    placeholder="Email" 
                    className = {styles.input_text}
                    {...formik.getFieldProps('email')}
                    />
                    <span className='icon flex items-center px-4'>
                      <HiAtSymbol size={25}/>  
                    </span>
                </div>
                {formik.errors.email && formik.touched.email ? <span className='text-rose-500'>{formik.errors.email}</span> : <></>}
                <div className={styles.input_group}>
                    <input
                    type={`${show.password ? "text": "Password"}`}
                    name="password"
                    placeholder="Password"
                    className = {styles.input_text}
                    {...formik.getFieldProps('password')}
                    />
                    <span className='icon flex items-center px-4' onClick={() => setShow({...show, password: !show.password})}>
                      <HiFingerPrint size={25}/>  
                    </span>
                </div>
                {formik.errors.password && formik.touched.password ? <span className='text-rose-500'>{formik.errors.password}</span> : <></>}
                <div className={styles.input_group}>
                    <input
                    type={`${show.cpassword ? "text": "Password"}`}
                    name="cpassword"
                    placeholder="Confirm Password"
                    className = {styles.input_text}
                    {...formik.getFieldProps('cpassword')}
                    />
                    <span className='icon flex items-center px-4' onClick={() => setShow({...show, cpassword: !show.cpassword})}>
                      <HiFingerPrint size={25}/>  
                    </span>
                </div>
                {formik.errors.cpassword && formik.touched.cpassword ? <span className='text-rose-500'>{formik.errors.cpassword}</span> : <></>}
                {/* Login Buttons */}
                <div className="input-button">
                    <button type="submit" className={styles.button}>
                        Register
                    </button>
                </div>
               
            </form>
        {/* bottom */}
        <p className="text-center text-gray-400">
            Have an account? <Link legacyBehavior href={'/login'}><a className='text-green-500'>Sign In</a></Link>
        </p>
        </section>
        </Layout>
    )
}