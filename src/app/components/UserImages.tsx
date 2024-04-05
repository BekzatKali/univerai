"use client"

import React, { useState } from 'react'
import { useSession } from 'next-auth/react';
import UserImage from './UserImage';

const UserImages = () => {
  const { data: session } =  useSession(); 
  const [images, setImages] = useState<string[]>([]);
  const [displayImages, setDisplayImages] = useState<boolean>(false);
  const userEmail = session?.user?.email || '';
  
  const handleClick = async () => {
    setDisplayImages((prev) => !prev)
    try {
      const res = await fetch(`/api/upload?userEmail=${encodeURIComponent(userEmail)}`, {
        method: 'GET',
      });
  
      if (res.ok) {
        const data = await res.json();
        console.log('Data received:', data);

        if (data.images && data.images.length > 0) {
          setImages(data.images)
        } else {
          console.log("No image URLs found for the user");
        }
      } else {
        console.error('Failed to fetch data:', res.statusText);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDelete = (id: string) => {
    setImages(prevImages => prevImages.filter((image: any) => image._id !== id));
  };

  return (
    <div className='mb-4'>
      <h1 className='mb-2'><span className='text-green-700 font-bold'>
        {session?.user?.name}'s</span> images
      </h1>
      <button className='mb-2 bg-blue-400 text-white px-6 py-2 rounded-md hover:bg-blue-600' onClick={handleClick}>{displayImages ? 'Hide' : 'Show'}</button>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        {displayImages && images.map((item: any, index) => (
          <UserImage 
            key={index} 
            id={item._id} 
            src={item.imageUrl} 
            alt={`Image ${index + 1}`} 
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default UserImages;