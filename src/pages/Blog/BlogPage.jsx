import React, { useEffect, useState } from "react";
import MainLayout from "../../components/MainLayout";
import { useQuery } from "@tanstack/react-query";
import ErroMessage from "../../components/ErroMessage";
import ArticleCardSkeleton from "../../components/ArticleCardSkeleton";
import ArticleCard from "../../components/ArticleCard";
import Pagination from "../../components/Pagination";
import { getAllPost } from "../../services/index/post";
import { useSearchParams } from "react-router-dom";

let isFirstTime = true;

export default function BlogPage() {
  //    const [search, setSearch] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamsValue = Object.fromEntries([...searchParams]);

  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParamsValue.page) || 1
  );
  const handelqueryStringChange = (page) => {
    setCurrentPage(page);

    setSearchParams({page})
  };

  const { data, isError, isPending, refetch } = useQuery({
    queryFn: () => getAllPost("", currentPage, 6),
    queryKey: ["posts", currentPage],
    onError: (error) => {
      {
        toast(error.message);
      }
    },
  });

  useEffect(() => {
    if (isFirstTime) {
      isFirstTime = false;
      return;
    }

    refetch;
  }, [refetch, currentPage]);

  return (
    <MainLayout>
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
