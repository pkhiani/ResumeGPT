import Head from "next/head";
import styles from "./index.module.css";
import { useState } from "react";
import Link from 'next/link'
import { useSession, getSession, signOut } from "next-auth/react"
import Hero from "../components/Hero";
import ContactUs from "../components/Contact";
import Demo from "../components/Demo"
import Footer from "../components/Footer"
import Privacy from "../components/Privacy";

export default function Home() {
    return (
        <div>
        <Head>
        <title>ResumeGPT</title>
        </Head>
    
        <Hero heading="Welcome to ResumeGPT - Your Personalized Resume Tailoring Solution!" message="Our cutting-edge web application harnesses the power of artificial intelligence (AI) to tailor your resume specifically to the job you're applying for, ensuring that you make a lasting impression on recruiters and employers." /> 

        <Demo></Demo>

        <Privacy></Privacy>

        <ContactUs></ContactUs>

        <Footer></Footer>

        </div>
        
      );
}