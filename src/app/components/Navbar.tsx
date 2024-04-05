import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='bg-green-700 mb-4'>
        <div className='max-w-[1220px] px-4 mx-auto flex justify-between items-center py-8 text-white'>
            <h1 className='text-xl font-bold uppercase'>Logo</h1>
            <div className='flex gap-4'>
                <Link className='font-bold' href='/login'>Log In</Link>
                <Link className='font-bold' href='/logout'>Log Out</Link>
            </div>
        </div>
    </div>
  )
}

export default Navbar