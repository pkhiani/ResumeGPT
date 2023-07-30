import Head from "next/head";
import About from "../components/About";
import Footer from "../components/Footer"

export default function AboutUs() {
    return (

        <div>
            <Head>
            <title>About</title>
            </Head>
        
            <About/> 

            <Footer></Footer>

        </div>

    )
}