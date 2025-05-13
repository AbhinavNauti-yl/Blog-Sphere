import {Link} from 'react-router-dom'
function Footer() {
  return (
    <div className=''>
      <section className='bg-[#023047] text-white pt-10 '>
        <footer className='container grid grid-cols-2 text-md items-center md:flex md:justify-between'>
          <div className='p-5'>
            <h1 className='p-2'>Servicies</h1>
            <ul className='text-sm flex flex-col gap-2 p-2'>
              <li>
                <Link to="/">Documentation</Link>
              </li>
              <li>
                <Link to="/">Desgine</Link>
              </li>
              <li>
                <Link to="/">Theame</Link>
              </li>
              <li>
                <Link to="/">Licience</Link>
              </li>
            </ul>
          </div>


          <div className='p-5'>
            <h1 className='p-2'>Company</h1>
            <ul className='text-sm flex flex-col gap-2 p-2'>
              <li>
                <Link to="/">About</Link>
              </li>
              <li>
                <Link to="/pricing">Pricing</Link>
              </li>
              <li>
                <Link to="/">Referal</Link>
              </li>
            </ul>
          </div>

          <div className='col-span-2 flex flex-col items-center p-5 md:order-first md:w-[calc(40%)]'>
            <h1 className='text-4xl'>BlogSphere</h1>
            <p className='w-[calc(60%)] text-sm text-center mt-5'>Your space. Your voice. Your sphere. Start blogging with BlogSphere
          today.</p>
          </div>

        </footer>
      </section>
    </div>
  )
}

export default Footer
