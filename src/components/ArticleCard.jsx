import React from 'react'
import images from '../constants/images.js'
import { Link } from 'react-router-dom';


export default function ArticleCard({post, className}) {
  
  return (
    <div className={`rounded-2xl mt-5 overflow-hidden shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)] ${className}`}>
      
      <Link to= {`/blog/${post.slug}`}>
        <img src={post.photo || images?.sampleImage} alt="image here" className='w-full object-cover object-center h-auto md:h-52 lg:h-48 xl:h-60'/>
      </Link>

      <div className='p-4'>
        <Link to= {`/blog/${post.slug}`}>
          <h1 className='text-2xl '>{post.title}</h1>
          <p className='text-grey-700'>{post.caption}</p>
        </Link>

      </div>

      <div className='flex flex-row  gap-5 px-4 pb-2 items-center '>
        <h4>{post.user?.name}</h4>
        <span>5 Feb</span>
      </div>

    </div>
  )
}
