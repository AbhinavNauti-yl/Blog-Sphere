import React from 'react'
import images from '../constants/images.js'


export default function ArticleCard({className}) {
  return (
    <div className={`rounded-2xl mt-5 overflow-hidden shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)] ${className}`}>

      <img src={images.p1} alt="image here" className='w-full object-center h-auto'/>

      <div className='p-4'>
        <h1 className='text-2xl '>Title</h1>
        <p className='text-grey-700'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe, possimus.</p>
      </div>

      <div className='flex flex-row  gap-5 px-4 pb-2 items-center '>
        <h4>Name Surname</h4>
        <span>5 Feb</span>
      </div>

    </div>
  )
}
