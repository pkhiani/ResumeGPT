import Head from "next/head";
import ContactUs from "../components/Contact";
import Footer from "../components/Footer"


export default function Contact() {
    return (

        <div>
            <Head>
            <title>Contact</title>
            </Head>
        
            <ContactUs></ContactUs>
            <Footer></Footer>
        </div>

    )
}