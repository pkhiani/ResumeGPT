import React from 'react'
import Link from 'next/link'

const Navbar = () => {
    return (
        <div>
            <div>
                <Link href='/'>
                    <h1>Capture</h1>
                </Link>
                <ul>
                    <li>
                        <Link href='/'>Home</Link>
                    </li>
                    <li>
                        <Link href='/'>About Us</Link>
                    </li>
                    <li>
                        <Link href='/'>How it Works</Link>
                    </li>
                    <li>
                        <Link href='/'>Contact</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}