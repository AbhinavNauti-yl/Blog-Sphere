import React from 'react'

export default function ArticleCardSkeleton({className}) {
  return (
    <div className={`rounded-2xl mt-5 overflow-hidden shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)] ${className} animate-pulse`}>
      
        {/* image */}
        <div  className='w-full bg-slate-50 h-auto md:h-52 lg:h-48 xl:h-60'/>
      

      <div className='p-4'>
        {/* for title */}
        <div className='text-2xl bg-slate-50'/>
        {/* for heading */}
        <div className='text-2xl bg-slate-50'/>
      </div>

      <div className='flex flex-row  gap-5 px-4 pb-2 items-center '>
        <div className='text-2xl bg-slate-50'/>
        <div className='text-2xl bg-slate-50'/>
      </div>

    </div>
  )
}
