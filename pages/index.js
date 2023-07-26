import Head from "next/head";
import styles from "./index.module.css";
import { useState } from "react";
import Link from 'next/link'
import { useSession, getSession, signOut } from "next-auth/react"
import Hero from "../components/Hero";
import ContactUs from "../components/Contact";

export default function Home() {
    return (
        <div>
        <Head>
        <title>ResumeGPT</title>
        </Head>
    
        <Hero heading="ResumeGPT" message='Tailor your Resume using AI' /> 

        <ContactUs></ContactUs>

        </div>
        
      );
}