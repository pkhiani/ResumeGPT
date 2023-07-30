import React from 'react'
import { useRouter } from 'next/router';

const Privacy = () => {

    const router = useRouter();

    const handleClick = () => {
      router.push('/login');
    };

    return (
        <div className="flex dark:bg-white h-96 items-center justify-center">
            <div className='p-8 text-black text-center items-center justify-center'> 
                <h2 className='text-5xl font-bold'>Your Privacy Matters</h2>
                <p className='py-5 text-xl'>At ResumeGPT, your privacy is of utmost importance to us. We use state-of-the-art security measures to safeguard your personal information. Rest assured that your data will never be shared with any third parties.</p>
            </div>
        </div>
    )
}

export default Privacy