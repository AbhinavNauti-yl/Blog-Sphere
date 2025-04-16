import React from 'react'

export default function ErroMessage({message}) {
  return (
    <div className=' p-5 m-5 rounded-2xl'>
        <p className='bg-red-300 text-2xl p-5'>
            {message}
        </p>
    </div>
  )
}
