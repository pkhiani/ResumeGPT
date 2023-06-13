import Head from 'next/head'
import Layout from '../layout/layout'
import Link from 'next/link'
import styles from '../styles/Form.module.css'
import Image from 'next/image'
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import { useState } from 'react'

export default function Register(){
    const [show,setShow] = useState({password: false, cpassword: false})
    return (

        <Layout>

            <Head>
                <title>Register</title>
            </Head>
        <section className='w-3/4 mx-auto flex flex-col gap-10'>
            <div className="title">
                <h1 className='text-gray-800 text-4xl font-bold py-4'>Register</h1>
                <p className='w-3/4 mx-auto text-gray-400'>Resgiter to access AI Resume Tailoring</p>
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
                    type={`${show.password ? "text": "Password"}`}
                    name="password"
                    placeholder="Password"
                    className = {styles.input_text}
                    />
                    <span className='icon flex items-center px-4' onClick={() => setShow({...show, password: !show.password})}>
                      <HiFingerPrint size={25}/>  
                    </span>
                </div>

                <div className={styles.input_group}>
                    <input
                    type={`${show.cpassword ? "text": "Password"}`}
                    name="cpassword"
                    placeholder="Confirm Password"
                    className = {styles.input_text}
                    />
                    <span className='icon flex items-center px-4' onClick={() => setShow({...show, cpassword: !show.cpassword})}>
                      <HiFingerPrint size={25}/>  
                    </span>
                </div>

                {/* Login Buttons */}
                <div className="input-button">
                    <button type="submit" className={styles.button}>
                        Login
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