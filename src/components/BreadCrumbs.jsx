import React from 'react'
import { Link } from 'react-router-dom'

export default function BreadCrumbs( {data} ) {
  return (
    <div className='flex text-md gap-2'>

      {
        data.map((item, index)=>(
          <div key={index} className='flex gap-1'>
            <Link to={item.link}>{item.name}</Link>
            <span className={index==data.length-1 ? "hidden" : "block"}>/</span>
          </div>
        ))
      }

    </div>
  )
}
