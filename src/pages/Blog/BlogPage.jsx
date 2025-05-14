import React, { useEffect, useState } from "react";
import MainLayout from "../../components/MainLayout";
import { useQuery } from "@tanstack/react-query";
import ErroMessage from "../../components/ErroMessage";
import ArticleCardSkeleton from "../../components/ArticleCardSkeleton";
import ArticleCard from "../../components/ArticleCard";
import Pagination from "../../components/Pagination";
import { getAllPost } from "../../services/index/post";
import { useSearchParams } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

let isFirstTime = true;

export default function BlogPage() {
  //    const [search, setSearch] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamsValue = Object.fromEntries([...searchParams]);

  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParamsValue.page) || 1
  );
  const [searchKeyword, setSearchKeyword] = useState(
    searchParamsValue?.search || ""
  );

  const handelqueryStringChange = (page) => {
    setCurrentPage(page);

    setSearchParams({ page, search: searchKeyword });
  };

  const { data, isError, isPending, refetch } = useQuery({
    queryFn: () => getAllPost(searchKeyword, currentPage, 6),
    queryKey: ["posts", currentPage],
    onError: (error) => {
      {
        toast(error.message);
      }
    },
  });

  console.log(data)

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    setSearchParams({ page:1, search: searchKeyword });
    refetch()
  };

  useEffect(() => {
    window.scroll(0,0)
    if (isFirstTime) {
      isFirstTime = false;
      return;
    }

    refetch;
  }, [refetch, currentPage, searchKeyword]);

  return (
    <MainLayout>
      <form
        onSubmit={handleSubmit}
        className={`flex flex-col gap-y-2.5 relative mt-15 ml-15 max-w-2xl`}
      >
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 text-[#656769]" />
          <input
            className="placeholder:font-bold font-semibold text-dark-soft placeholder:text-[#575757] rounded-lg pl-12 pr-3 w-full py-3 focus:outline-none shadow-[rgba(53,53,53,0.19)] md:py-4 bg-blue-100"
            type="text"
            placeholder="Search article"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary bg-blue-700 text-white font-semibold rounded-lg px-5 py-3 md:absolute md:right-2 md:top-1/2 md:-translate-y-1/2 md:w-fit md:py-2"
        >
          Search
        </button>
      </form>

      <section className="flex flex-col items-center">
        <div className="flex flex-wrap container px-5 py-10 mx-auto md:px-5 md-py-10 justify-between ">
          {isPending ? (
            [...Array(6)].map((item, index) => (
              <ArticleCardSkeleton
                key={index}
                className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
              />
            ))
          ) : isError ? (
            <ErroMessage message="Could not fetch Artcles" />
          ) : data?.data?.data.length == 0 ? (
            <p className="text-2xl text-orange-500">No Post Found</p>
          ) : (
            data?.data?.data.map((post) => (
              <ArticleCard
                key={post._id}
                post={post}
                className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-20px)]"
              />
            ))
          )}
        </div>

        {!isPending && (
          <Pagination
            onPageChange={(page) => handelqueryStringChange(page)}
            currentPage={currentPage}
            totalPageCount={data?.headers?.["x-totalpagescount"]}
          />
        )}
      </section>
    </MainLayout>
  );
}
