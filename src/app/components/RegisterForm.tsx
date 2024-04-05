'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const [success, setSuccess] = useState("");

  const router = useRouter();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("All fields are required");
      setSuccess("");
      return;
    }

    try {
      const resUserExists = await fetch('/api/userExists', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email})
      })

      const {user} = await resUserExists.json();

      if (user) {
          setError("User already exists")
          setSuccess("");
          return;
      }

      const res = await fetch('api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name, 
          email, 
          password
        })
      })
      
      if (res.ok) {
        const form = e.target as HTMLFormElement;
        form.reset();
        router.push("/")
        setError('')
        setSuccess('User registered successfully')
      } else {
        console.log("User registration failed")
      }
    } catch (error) {
      console.log("Error during user registration", error);
    }
  }

  return (
    <div className='flex flex-col max-w-[400px] mx-auto'>
        <h2 className='mb-2 text-center uppercase'>Register</h2>
        <form onSubmit={handleSubmit} className='flex rounded-md flex-col gap-4 ring ring-green-600 p-2'>
            <input name='name' className='ring-1 px-4 py-2 bg-slate-100 rounded-md' onChange={(e) => setName(e.target.value)} type="text" placeholder='Full Name' />
            <input onChange={(e) => setEmail(e.target.value)} name='email' className='ring-1 px-4 py-2 bg-slate-100 rounded-md' type="email" placeholder='Email' />
            <input onChange={(e) => setPassword(e.target.value)} name='password' className='ring-1 px-4 py-2 bg-slate-100 rounded-md' type="password" placeholder='Password' />
            <button className='bg-green-700 text-white py-4 rounded-md font-bold hover:bg-green-600 duration-300'>Register</button>

            {error && (
              <div className='bg-red-500 rounded-md w-fit text-white p-2'>
                {error}
              </div>
            )}

            {
              success && (
                <div className='bg-green-500 rounded-md w-fit text-white p-2'>
                  {success}
                </div>
              )
            }

            <Link className='text-sm mt-3 text-right flex gap-1 justify-end' href='/'>
                Already have an account? 
                <span className='underline'>
                    Login
                </span>
            </Link>

        </form>
    </div>
  )
}

export default RegisterForm