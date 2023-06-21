import React from 'react'
import { useRouter } from 'next/router';

const Hero = ({heading, message}) => {

    const router = useRouter();

    const handleClick = () => {
      router.push('/login');
    };

    return (
        <div className='flex items-center justify-center h-screen mb-12 bg-fixed bg-center bg-cover bg-green-300'>
            <div className='absolute top-0 left-0 right-0 bottom-0 bg-green/70 z-[2]'/>
            <div className='p-5 text-white z-[2] mt-[-10rem]'>
                <h2 className='text-5xl font-bold'>{heading}</h2>
                <p className='py-5 text-xl'>{message}</p>
                <button onClick={handleClick} className='px-8 py-2 border'>Login</button>

            </div>
        </div>
    )
}

export default Hero