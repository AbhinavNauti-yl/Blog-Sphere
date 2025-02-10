import React from 'react'

import { CiSearch } from "react-icons/ci";

const Hero = () => {
    return (
        <section className='container flex flex-col mx-auto lg:flex-row'>

            <div className='m-10 lg:w-1/2'>
                <h1 className='text-4xl text-black py-10 text-center lg:text-left lg:text-6xl lg:max-w[540] '>Intresting Articles</h1>
                <p className='text-2xl justify-center text-center lg:text-left lg:text-3xl text-gray-700'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, deserunt. Esse ipsam deserunt molestias natus error ipsa architecto incidunt.</p>
            
            
                <div className='flex flex-col m-5 relative gap-2.5 lg:flex-row items-center'>
                    <div>
                        <CiSearch className='transform translate-y-6.5 left-3 w-6 h-6 text-gray-400'/>

                        <input type="text" className='border-black px-15 align-middle rounded-2xl shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]'placeholder='search'/>
                    </div>
                    <button className='w-fit px-2 bg-blue-400 rounded-2xl text-white transform translate-y-5 hover:bg-blue-700'>Search</button>
                </div>

                <div className='flex flex-col mt-10 gap-2 lg:flex-row'>
                    <span className='text-grey-500 '>Popular Tags:</span>
                    <ul className='flex flex-wrap flex-row lg gap-5 '>
                        <li className='rounded-2xl bg-amber-200 text-black px-1 '>
                            <a href="/">hello</a>
                        </li>
                        <li className='rounded-2xl bg-amber-200 text-black px-1 '>
                            <a href="/">hello world</a>
                        </li>
                        <li className='rounded-2xl bg-amber-200 text-black px-1 '>
                            <a href="/">hello</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div></div>
        </section>
    )
}

export default Hero