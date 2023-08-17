import Head from 'next/head'
import Layout from '../layout/layout'
import Link from 'next/link'
import styles from '../styles/Form.module.css'
import Image from 'next/image'
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import { useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useFormik } from 'formik'
import login_validate from '../lib/validate'
import { useRouter } from 'next/router'

export default function Login(){

    const [show,setShow] = useState(false)
    const router = useRouter()
    // formik hook
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validate : login_validate,
        onSubmit
    })

    console.log(formik.errors)

    async function onSubmit (values) {
        const status = await signIn('credentials', {
            redirect: false,
            email: values.email,
            password: values.password,
            callbackUrl: "/home"
        })

        if(status.ok) router.push(status.url)
    }

    // Google handler function

    async function handleGoogleSignin(){
        signIn('google', {callbackUrl: "http://localhost:3000/home"})
    }

    return (

        <Layout>

            <Head>
                <title>Login</title>
            </Head>
        <section className='w-3/4 mx-auto flex flex-col gap-10'>
            <div className="title">
                {/* <h1 className='text-gray-800 text-4xl font-bold py-4'>ResumeGPT</h1> */}
                <p className='w-3/4 mx-auto text-black font-medium'>Login to access AI Resume Tailoring</p>
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
                    type={`${show ? "text": "Password"}`}
                    name="password"
                    placeholder="Password"
                    className = {styles.input_text}
                    {...formik.getFieldProps('password')}
                    />
                    <span className='icon flex items-center px-4' onClick={() => setShow(!show)}>
                      <HiFingerPrint size={25}/>  
                    </span>
                </div>
                {formik.errors.password && formik.touched.password ? <span className='text-rose-500'>{formik.errors.password}</span> : <></>}

                {/* Login Buttons */}
                <div className="input-button">
                    <button type="submit" className={styles.button}>
                        Login
                    </button>
                </div>
                <div className="input-button">
                    <button type="button" onClick={handleGoogleSignin} className={styles.button_custom}>
                        Sign in With Google <Image src={'/assets/google-logo.svg'} width="20" height={20}></Image>
                    </button>
                </div>
                {/* <div className="input-button">
                    <button type="button" className={styles.button_custom}>
                        Sign in with GitHub <Image src={'/assets/github-mark.svg'} width="20" height={20}></Image>
                    </button>
                </div> */}
            </form>
        {/* bottom */}
        <p className="text-center text-gray-400 font-medium">
            Don't have an account yet? <Link legacyBehavior href={'/register'}><a className='text-green-500'>Sign Up</a></Link>
        </p>
        </section>
        </Layout>
    )
}