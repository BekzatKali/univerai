"use client"

import Link from 'next/link'
import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false
      });

      if (res?.error) {
        setError("Invalid credentials");
        return;
      }

      if (res?.ok) {
        router.replace('/dashboard');
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='flex flex-col max-w-[400px] mx-auto'>
      <h2 className='mb-2 text-center uppercase'>Login</h2>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 rounded-md ring ring-green-600 p-2'>
        <input onChange={(e) => setEmail(e.target.value)} className='ring-1 bg-slate-100 rounded-md px-4 py-2' type="text" placeholder='Email' />
        <input onChange={(e) => setPassword(e.target.value)} className='ring-1 bg-slate-100 rounded-md px-4 py-2' type="password" placeholder='Password' />
        <button className='bg-green-700 text-white py-4 duration-300 font-bold hover:bg-green-600 rounded-md'>Login</button>

        {error && (
          <div className='bg-red-500 rounded-md w-fit text-white p-2'>
            {error}
          </div>
        )}

        <Link className='text-sm mt-3 text-right flex gap-1 justify-end' href='/register'>
          Don't have an account?
          <span className='underline'>
            Register
          </span>
        </Link>
      </form>
    </div>
  )
}

export default LoginForm
