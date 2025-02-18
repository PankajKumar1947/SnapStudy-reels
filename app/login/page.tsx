"use client"
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const page = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (result?.error) {
            setError(result.error);
        } else {
            setError("");
            router.push("/");
        }
    }
    return (
        <form action="" className='space-y-4 max-w-xl mx-auto border p-6 py-14 rounded-xl overflow-hidden mt-20'>
            <h2 className='text-xl text-center'>Login</h2>
            <label className="input input-bordered flex items-center gap-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70">
                    <path
                        d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path
                        d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className="grow" placeholder="Email" />
            </label>
            <label className="input input-bordered flex items-center gap-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70">
                    <path
                        d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    type="password" className="grow" placeholder="Password" />
            </label>
            <div className='flex justify-center'>
                <button type='submit' onClick={handleSubmit} className="btn btn-outline btn-secondary">Login</button>
            </div>
            <div className='text-center'>
                <Link href={"/register"} className='text-sm hover:text-blue-500'>New to SnapStudy ?</Link>
            </div>
            {error && <p className='text-red-500 text-center'>{error}</p>}
        </form>
    )
}

export default page