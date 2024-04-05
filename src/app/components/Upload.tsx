"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSession } from 'next-auth/react';

export default function Upload() {
  const { register, handleSubmit } = useForm();
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState('')
  const [comment, setComment] = useState('')
  const { data: session } =  useSession(); 
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files?.[0];
    reader.onloadend = () => {
      if (file) {
        setImagePreviewUrl(reader.result as string);
      }
    }
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  const onSubmit = async (data: any) => {
    // Extract the Uploaded Image
    const image = data.profile[0];
    // Create an Instance of Form Data
    const formData = new FormData();
    // Append The Image to the Form Data
    formData.append("file", image);
    // BIND the upload preset to the form data
    formData.append("upload_preset", "univerai");
    // Make an API request to Cloudinary
    const uploadResponse = await fetch(
      "https://api.cloudinary.com/v1_1/univeraiguys/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    const uploadedImageData = await uploadResponse.json();
    console.log(uploadedImageData);
    const imageUrl = uploadedImageData.secure_url;
    if (imageUrl) {
      setImageUrl(imageUrl);
    }
    console.log(imageUrl);
    try {
      if (!session) {
        console.error('User is not authenticated.');
        return;
      }
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageUrl: imageUrl,
          comment: comment,
          userEmail: session?.user?.email, 
        }),
      });
  
      if (res.ok) {
        console.log('Data uploaded successfully.');
      } else {
        console.error('Failed to upload data:', res.statusText);
      }
    } catch (error) {
      console.error('Error uploading data:', error);
    }
  };

  return (
    <div className="mb-6 items-center flex justify-between gap-3">
      <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="file_input"
        >
          <span className="text-xl font-bold">Upload File</span>
        </label>
        <input
          {...register("profile")}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 p-2 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          aria-describedby="file_input_help"
          id="file_input"
          type="file"
          onChange={handleImageChange}
        />

        <button
          type="submit"
          className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 my-4"
        >
          Upload to Cloud
        </button>
      </form>
      <div className="flex flex-col gap-1">
        {imagePreviewUrl && (
          <img
            className="object-cover rounded-md w-[600px] h-[300px]"
            src={imagePreviewUrl}
            alt="Preview"
          />
        )}
        {imageUrl && <input value={comment} onChange={(e) => setComment(e.target.value)} type="text" placeholder="Write comments"/>}
      </div>
    </div>
  );
}








// import React, { useState } from 'react';
// import { useSession } from 'next-auth/react';

// const Upload = () => {
//   const { data: session } =  useSession(); 
//   const [text, setText] = useState('');

//   // CloudName = univeraiguys
//   // Upload Preset = univerai

  // const handleSubmit = async () => {
  //   try {
  //     if (!session) {
  //       console.error('User is not authenticated.');
  //       return;
  //     }
  //     const res = await fetch('/api/upload', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         text: text,
  //         userEmail: session?.user?.email, 
  //       }),
  //     });
  
  //     if (res.ok) {
  //       console.log('Data uploaded successfully.');
  //       setText('')
  //     } else {
  //       console.error('Failed to upload data:', res.statusText);
  //     }
  //   } catch (error) {
  //     console.error('Error uploading data:', error);
  //   }
  // };

//   return (
//     <div className='ring-2 rounded-md ring-green-600 p-4 flex flex-col gap-4'>
//       <h1 className='font-bold mb-2'>Upload Text</h1>
//       <input
//         type='text'
//         value={text}
//         onChange={(e) => setText(e.target.value)} 
//         className='ring-2 ring-green-600 outline-none p-2 rounded-md'
//         placeholder='Enter text'
//       />
//       <button className='bg-green-700 text-white py-4 duration-300 font-bold hover:bg-green-600 rounded-md' 
//       onClick={handleSubmit}>Upload</button>
//     </div>
//   );
// };

// export default Upload;
