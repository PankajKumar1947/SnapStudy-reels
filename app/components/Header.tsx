"use client"

import React from 'react'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
const Header = () => {
    const { data: session } = useSession();

    const handleSignout = async () => {
        try {
            await signOut();
        } catch (error) {

        }
    }
    return (
        <div className="navbar bg-base-100 max-w-7xl rounded-lg px-6 mx-auto">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h7" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li><a>Homepage</a></li>
                        <li><a>Portfolio</a></li>
                        <li><a>About</a></li>
                    </ul>
                </div>
            </div>
            <div className="navbar-center">
                <a className="btn btn-ghost text-xl">SnapStudy</a>
            </div>
            <div className="navbar-end">
                <button className="btn btn-ghost btn-circle">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>
                <div className='flex items-center gap-x-4'>
                    {
                        session ? (
                            <div className='flex gap-2 items-center'>
                                <button onClick={handleSignout}>Signout</button>
                            </div>
                        ) : (
                            <div className='flex gap-2 items-center'>
                                <Link href={"/login"}>Login</Link>
                                <Link href={"/signup"}>Signup</Link>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Header