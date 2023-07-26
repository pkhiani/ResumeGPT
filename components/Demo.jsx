import React from 'react'
import { useRouter } from 'next/router';

const Demo = () => {

    const router = useRouter();

    const handleClick = () => {
      router.push('/login');
    };

    return (
        <div className="lg:px-40 dark:bg-green-600 md:h-96">
            <div className='absolute top-0 left-0 right-0 bottom-0 bg-green/70 z-[2]'/>
            <div className='p-5 text-center text-black mt-[-10rem]'>
                <h2 className='text-5xl font-bold'>How does it work?</h2>
                <p className='py-5 text-xl'>We don't steal your data</p>
                {/* <button onClick={handleClick} className='text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800 hover:no-underline'>Get Started</button> */}

            </div>
        </div>



        

    )
}

export default Demo