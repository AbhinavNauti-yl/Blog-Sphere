import React, { useState } from 'react'

import { CgMenuRightAlt } from "react-icons/cg";
import { MdOutlineCloseFullscreen } from "react-icons/md";


const NavItem = ({name}) => {
    return (
            <li className='group'>
                <a href="/">{name}</a>
                <span className='text-blue-500 opacity-0 transition-all duration-500 right-0 top-0 relative group-hover:text-black group-hover:opacity-100 group-hover:right-[100%]'>|</span>
            </li>
        
    )
}

const navItemInfo = [
    {name : "Home"},
    {name : "Article"},
    {name : "Pages"},
    {name : "Pricing"},
    {name : "Faq"},
]



function Header() {
  
  const [isNavVisible, setNavVisible] = useState(false)
  const chaneVisiblity = () => {
    setNavVisible ((current) => {
      return !current
    })
  }


  return (
    <div className='sticky left-0 right-0 top-0 z-51 bg-blue-100'>
      <section>
        <header className='container mx-auto px-5 flex justify-between py-4'>
            <div><h1 className='text-3xl text-blue-400'>BlogSphere</h1></div>

            <div className='lg:hidden z-50'>
              {isNavVisible ? <MdOutlineCloseFullscreen onClick={chaneVisiblity} className="h-7 w-7"/> : <CgMenuRightAlt onClick={chaneVisiblity} className="h-7 w-7"/>}
            </div>

            <div className={`${isNavVisible ? "right-0" : "-right-full"} flex flex-col lg:flex-row justify-center lg:justify-end fixed w-full lg:w-auto  top-0 bottom-0 gap-5 z-49 lg:static text-2xl items-center transition-all duration-200 g-5 bg-blue-100`}>
                <ul className='flex flex-col lg:flex-row gap-10 items-center'>
                    {navItemInfo.map((items) => (
                        <NavItem key={items.name} name={items.name} />
                    ))}
                </ul>
                <button className='border-1 text-cyan-400 px-3 rounded-2xl hover:bg-blue-400 hover:text-white hover:transition-all duration-150 w-30'>Sign In</button>
            </div>
        </header>
      </section>
    </div>
  )
}

export default Header
