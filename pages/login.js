import Head from 'next/head'
import Layout from '../layout/layout'
import Link from 'next/link'
import styles from '../styles/Form.module.css'
import Image from 'next/image'
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import { useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"

export default function Login(){

    const [show,setShow] = useState(false)

    // Google handler function

    async function handleGoogleSignin(){
        signIn('google', {callbackUrl: "http://localhost:3000"})
    }

    return (

        <Layout>

            <Head>
                <title>Login</title>
            </Head>
        <section className='w-3/4 mx-auto flex flex-col gap-10'>
            <div className="title">
                <h1 className='text-gray-800 text-4xl font-bold py-4'>ResumeGPT</h1>
                <p className='w-3/4 mx-auto text-gray-400'>Login to access AI Resume Tailoring</p>
            </div>

            <form className="flex flex-col gap-5">
                {/* Input fields */}
                <div className={styles.input_group}>
                    <input
                    type="email"
                    name="email"
                    placeholder="Email" 
                    className = {styles.input_text}
                    />
                    <span className='icon flex items-center px-4'>
                      <HiAtSymbol size={25}/>  
                    </span>
                </div>
                <div className={styles.input_group}>
                    <input
                    type={`${show ? "text": "Password"}`}
                    name="password"
                    placeholder="Password"
                    className = {styles.input_text}
                    />
                    <span className='icon flex items-center px-4' onClick={() => setShow(!show)}>
                      <HiFingerPrint size={25}/>  
                    </span>
                </div>

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
        <p className="text-center text-gray-400">
            Don't have an account yet? <Link legacyBehavior href={'/register'}><a className='text-green-500'>Sign Up</a></Link>
        </p>
        </section>
        </Layout>
    )
}