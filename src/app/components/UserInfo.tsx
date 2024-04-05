"use client"
import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'

const UserInfo = () => {
  const {data: session} = useSession();
  console.log(session);
  return (
    <div className='ring-2 rounded-md ring-green-600 mt-4 p-4 flex flex-col gap-2 max-w-[400px]'>
      <p>Name: {session?.user?.name}</p>
      <p>Email: {session?.user?.email}</p>
      <button onClick={() => signOut({ redirect: true, callbackUrl: '/' })} className='bg-red-400 hover:bg-red-600 duration-300 text-white py-2 px-4 rounded-md'>Log Out</button>
    </div>
  )
}

export default UserInfo