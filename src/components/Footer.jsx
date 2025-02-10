import React from 'react'

function Footer() {
  return (
    <div className=''>
      <section className='bg-[#023047] text-white pt-10 '>
        <footer className='container grid grid-cols-2 text-md items-center md:flex md:justify-between'>
          <div className='p-5'>
            <h1 className='p-2'>Servicies</h1>
            <ul className='text-sm flex flex-col gap-2 p-2'>
              <li>
                <a href="/">Documentation</a>
              </li>
              <li>
                <a href="/">Desgine</a>
              </li>
              <li>
                <a href="/">Theame</a>
              </li>
              <li>
                <a href="/">Licience</a>
              </li>
            </ul>
          </div>


          <div className='p-5'>
            <h1 className='p-2'>Conpany</h1>
            <ul className='text-sm flex flex-col gap-2 p-2'>
              <li>
                <a href="/">About</a>
              </li>
              <li>
                <a href="/">Pricing</a>
              </li>
              <li>
                <a href="/">Policy</a>
              </li>
              <li>
                <a href="/">Referal</a>
              </li>
            </ul>
          </div>

          <div className='col-span-2 flex flex-col items-center p-5 md:order-first md:w-[calc(40%)]'>
            <h1 className='text-4xl'>BlogSphere</h1>
            <p className='w-[calc(60%)] text-sm text-center mt-5'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus, officiis.</p>
          </div>

        </footer>
      </section>
    </div>
  )
}

export default Footer
