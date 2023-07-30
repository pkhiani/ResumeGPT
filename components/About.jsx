import React from 'react'
import { useRouter } from 'next/router';

const About = () => {

    const router = useRouter();

    const handleClick = () => {
      router.push('/login');
    };

    return (
        <div className='h-screen bg-cover items-center bg-white'>
            <div className='p-8 pt-16 text-black'>
                <h3 className='py-5 text-2xl font-bold'>Welcome to ResumeGPT - Your Personalized Resume Tailoring Solution!</h3>
                <p className='text-l'>At ResumeGPT, we believe that every job seeker deserves a standout resume that highlights their unique skills and experiences, increasing their chances of landing their dream job. Our cutting-edge web application harnesses the power of artificial intelligence (AI) to tailor your resume specifically to the job you're applying for, ensuring that you make a lasting impression on recruiters and employers.</p>
                <h3 className='py-2 text-2xl font-bold'>Our Mission</h3>
                <p className='py-2 text-l'>Our mission is simple: to empower job seekers with the tools they need to present themselves confidently and effectively in the competitive job market. We understand the challenges of crafting the perfect resume that showcases your abilities while aligning with the requirements of the job. ResumeGPT is here to bridge that gap by providing personalized, AI-driven resume tailoring services accessible to all.</p>
                <h3 className='py-2 text-2xl font-bold'>How it Works</h3>
                <p className='py-2 text-l'>Our AI-driven platform uses sophisticated algorithms and machine learning to analyze job descriptions and compare them with your existing resume. Our system identifies the keywords, skills, and experiences most relevant to the job you're targeting. We then suggest personalized improvements and optimizations to make your resume a perfect match for the position.</p>
                <h3 className='py-2 text-2xl font-bold'>Start Tailoring Your Success Today</h3>
                <p className='py-2 text-l'>Join thousands of satisfied users who have already improved their chances of landing their dream job with ResumeGPT. Whether you're a recent graduate, a seasoned professional, or transitioning careers, our AI-powered platform is here to support you every step of the way.</p>
                <p className='py-2 text-l'>Take charge of your job search and create a compelling, tailored resume with ResumeGPT. Let's work together to unlock your full potential and open doors to exciting career opportunities!</p>
            </div>
        </div>



        

    )
}

export default About