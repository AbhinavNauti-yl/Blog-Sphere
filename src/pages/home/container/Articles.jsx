import React from 'react'
import ArticleCard from '../../../components/ArticleCard'
import { MdExpandMore } from "react-icons/md";

export default function Articles() {
  return (
    <section className='flex flex-col items-center'>
      <div className='flex flex-wrap container px-5 py-10 mx-auto md:px-5 md-py-10 justify-between '>
          <ArticleCard className = "w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-20px)]" />
          <ArticleCard className = "w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-20px)]" />
          <ArticleCard className = "w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-20px)]" />
      </div>

      <button className='flex text-2xl flex-row items-center bg-blue-200 rounded-md px-2 hover:bg-blue-300 md:text-3xl md-w-md lg:text-4xl'>
        <span>More</span>
        <MdExpandMore />
      </button>

    </section>

  )
}
