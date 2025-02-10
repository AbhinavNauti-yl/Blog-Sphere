import React from 'react'

import images from '../../../constants/images'


export default function () {
  return (
    <div>

        <section className=' mt-5 p-5 bg-[#023047] text-white flex flex-col items-center md:flex-row md:gap-5'>

            <div className='hidden md:block '>
                <img src={images.email} alt="image here" className='overflow-hidden object-center rounded-4xl' />

            </div>

            <div className='flex flex-col gap-y-10'>
                <h1 className='text-4xl'>Get stories delevired to your inbox weekly</h1>

                <div className='flex container flex-col gap-y-5 text-2xl'>
                    <input placeholder="Enter email" className='w-full rounded-2xl bg-amber-50 text-black p-2 shadow-[inset_-12px_-8px_40px_#46464620]'/>

                    <button className='w-full rounded-2xl bg-blue-500 p-2'>
                        Get Started
                    </button>
                </div>

                <p className=''>
                    <span className='italic'>Lorem ipsum dolor sit amet</span> consectetur, adipisicing elit. Sequi eveniet maxime dolorum laborum, vitae dolore.
                </p>
            </div>

            
        </section>
    </div>
  )
}
