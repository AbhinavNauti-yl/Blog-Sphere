import React from 'react'
import ArticleCard from '../../../components/ArticleCard'
import { MdExpandMore } from "react-icons/md";
import {useQuery} from "@tanstack/react-query"
import toast from 'react-hot-toast';
import { getAllPost } from '../../../services/index/post';
import ArticleCardSkeleton from '../../../components/ArticleCardSkeleton';
import ErroMessage from '../../../components/ErroMessage';
import { Link } from 'react-router-dom';

export default function Articles() {

  const {data, isError, isPending} = useQuery({
    queryFn: () => getAllPost("", 1, 6),
    queryKey: ["posts"],
    onError: (error) => {{
      toast(error.message)
    }},
  })


  return (
    <section className='flex flex-col items-center'>
      <div className='flex flex-wrap container px-5 py-10 mx-auto md:px-5 md-py-10 justify-between '>
          {isPending ? (
            [...Array(3)].map((item, index) => (
              <ArticleCardSkeleton key={index} className = "w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"/>
            ))
          ) : 
          isError ? (
            <ErroMessage message="Could not fetch Artcles" />
          ) :
           data?.data?.data.slice(0,6).map((post) => 
            <ArticleCard key={post._id} post={post} className = "w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-20px)]" />
          )}

      </div>

      <Link to="/blog" className='flex text-2xl flex-row items-center bg-blue-200 rounded-md px-2 hover:bg-blue-300 md:text-3xl md-w-md lg:text-4xl'>
        <span>More</span>
        <MdExpandMore />
      </Link>

    </section>

  )
}
