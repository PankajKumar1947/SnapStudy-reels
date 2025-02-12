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
        <div>
            <button onClick={handleSignout}>Signout</button>
            {
                session ? (
                    <div>Welcom</div>
                ) : (
                    <div>
                        <Link href={"/login"}>Login</Link>
                        <Link href={"/signup"}>Signup</Link>
                    </div>
                )
            }
        </div>
    )
}

export default Header