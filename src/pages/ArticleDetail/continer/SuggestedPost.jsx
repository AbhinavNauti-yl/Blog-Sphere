import React from 'react'
import { Link } from 'react-router-dom'
import images from '../../../constants/images'

export default function SuggestedPost({ header, post = [], tags = [] }) {
  return (
    <div className='p-5 flex flex-col shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)] lg:max-w-md'>
    
        <h1>{header}</h1>

        <div className='grid  md:grid-cols-2 lg:grid-cols-1'>
            {
                post?.data?.data.map( (item, index) => (
                    <Link to={`/blog/${item.slug}`} key={index} className='flex p-3 gap-3 '>
                        <img src={item.photo ? item.photo : item.photo == "" ? images.sampleImage : images.sampleImage} className='w-1/5 rounded-lg aspect-square' alt="image here" />

                        <div>
                            <h1>{item.title}</h1>
                            <span>{item.createdAt}</span>
                        </div>
                    </Link>
                ) )
            }
        </div>
        
        <h1>Tags</h1>
        <div className='flex gap-3 flex-wrap text-sm text-white'>
            {tags.length > 0 ? (
                tags.map( (item, index ) => (
                    <Link to="" key={index} className='inline-block px-1 py-1 rounded-lg bg-blue-500 '>
                        {item}
                    </Link>
                ))
            ) : (
                <p className = "text-md mt-4 text-slate-500">No Tags</p>
            )}
        </div>
    </div>
  )
}
