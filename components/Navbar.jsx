import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'

const Navbar = () => {

    const [nav, setNav] = useState(false);
    const [color, setColor] = useState('transparent');
    const [textColor, setTextColor] = useState('black');


    const handleNav = () => {
        setNav(!nav)
    };

    useEffect(() => {
        const changeColor = () => {
          if (window.scrollY >= 10) {
            setColor('#ffffff');
            setTextColor('#000000');
          } else {
            setColor('transparent');
            setTextColor('#000000');
          }
        };
        window.addEventListener('scroll', changeColor);
      }, []);

    return (
        <div style ={{backgroundColor: `${color}`}} className='fixed left-0 top-0 w-full z-10 ease-in duration-300'>
            <div className='max-w-[1240px] m-auto flex justify-between items-center p-4 hover:no-underline'>
                <Link className='hover:no-underline' href='/'>
                    <h1 style ={{color: `${textColor}`}} className='font-bold text-4xl'>ResumeGPT</h1>
                </Link>
                <ul style ={{color: `${textColor}`}} className='hidden sm:flex hover:no-underline'>
                    <li className='p-4'>
                        <Link className='hover:no-underline text-black' href='/'>Home</Link>
                    </li>
                    <li className='p-4'>
                        <Link className='hover:no-underline text-black' href='/'>About Us</Link>
                    </li>
                    <li className='p-4'>
                        <Link className='hover:no-underline text-black' href='/'>How it Works</Link>
                    </li>
                    <li className='p-4'>
                        <Link className='hover:no-underline text-black' href='/'>Contact</Link>
                    </li>
                </ul>

                {/* Mobile Button */}
                <div onClick={handleNav} className='block sm:hidden z-10'>
                {nav ? (
                        <AiOutlineClose size={20} style={{ color: `${textColor}` }} />
                    ) : (
                        <AiOutlineMenu size={20} style={{ color: `${textColor}` }} />
                    )}
                </div>
                {/* Mobile Menu */}
                <div className={ nav
              ? 'sm:hidden absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full h-screen bg-white text-center ease-in duration-300'
              : 'sm:hidden absolute top-0 left-[-100%] right-0 bottom-0 flex justify-center items-center w-full h-screen bg-white text-center ease-in duration-300'
                }>
                    <ul>
                        <li onClick={handleNav} className='p-4 text-4xl hover:text-gray-500'>
                            <Link className='hover:no-underline' href='/'>Home</Link>
                        </li>
                        <li onClick={handleNav} className='p-4 text-4xl hover:text-gray-500'>
                            <Link className='hover:no-underline' href='/'>About Us</Link>
                        </li>
                        <li onClick={handleNav} className='p-4 text-4xl hover:text-gray-500'>
                            <Link className='hover:no-underline' href='/'>How it Works</Link>
                        </li>
                        <li onClick={handleNav} className='p-4 text-4xl hover:text-gray-500'>
                            <Link className='hover:no-underline' href='/'>Contact</Link>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    )
}

export default Navbar;