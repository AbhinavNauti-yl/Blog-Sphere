import React from 'react'
import Header from './components/header/Header'
import { Outlet } from 'react-router-dom'

export default function AdminLayout() {
  return (
    <div className='flex flex-col h-screen lg:flex-row'>
      <Header />
      <main className='bg-[#ebe7e7] flex-1  '>
        <Outlet />
      </main>
    </div>
  )
}
