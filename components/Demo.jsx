import React from 'react'
import { useRouter } from 'next/router';

const Demo = () => {

    const router = useRouter();

    const handleClick = () => {
      router.push('/login');
    };

    return (
        <div className="flex dark:bg-green-600 mt-[-10rem] h-96 items-center justify-center">
            <div className='text-black text-center items-center justify-center'> 
                <h2 className='text-5xl font-bold'>How it Works</h2>
                <p className='py-5 text-xl'>Our AI-driven platform uses sophisticated algorithms and machine learning to analyze job descriptions and compare them with your existing resume. Our system identifies the keywords, skills, and experiences most relevant to the job you're targeting. We then suggest personalized improvements and optimizations to make your resume a perfect match for the position.</p>
            </div>
        </div>
    )
}

export default Demo