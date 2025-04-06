import React from 'react'
import { CiCamera } from "react-icons/ci";
import { deleteProfileAvatar } from '../../serveices/index/user';
import { useQuery } from '@tanstack/react-query';

export default function ProgfileAvata({avatar}) {

  const {data, isPending, isErrors, refetch} = useQuery({
    queryFn: () => {
      return deleteProfileAvatar()
    },
    queryKey: ["delete"],
    enabled: false,
  })

  return (
    <div className='flex flex-row items-center gap-5 my-5'>
      <div className='relative w-25 h-25'>
        <label htmlFor="profilePicture" className='cursor-pointer  absolute  bg-transparent rounded-full border-2 border-black p-1'>
            {
                avatar?(
                    <img src={avatar} className='w-25 h-25 rounded-full'/>
                ):(
                    <div>
                        <CiCamera className='w-25 h-25 rounded-full'/>
                    </div>
                )
            }
        </label>
        <input type="file" id='profilePicture' className='sr-only'/>
      </div>
      <button onClick={() => refetch()} className=' text-xl text-red-500 outline outline-red-400 rounded-2xl px-2 hover:outline-red-700 hover:text-red-700'>Delete</button>
    </div>
  )
}
