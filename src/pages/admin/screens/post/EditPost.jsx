import React from "react";
import MainLayout from "../../../../components/MainLayout";
import ArticleDetailSkeleton from '../../../ArticleDetail/component/ArticleDetailSkeleton.jsx'

import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllPost, getParticularPost } from "../../../../services/index/post.js";
import ErroMessage from "../../../../components/ErroMessage.jsx";
import { useState } from "react";

import { htmlParse } from "../../../../utils/htmlParser.js";
import images from "../../../../constants/images.js";

const EditPost = () => {
  const { slug } = useParams();

  const [breadCrumbsData, setBreadCrumbsData] = useState([]);
  const [body, setBody] = useState(null);
  const [photo, setPhoto] = useState(null)

  // for getting a particular post
  const { data, isError, isPending } = useQuery({
    queryKey: ["newPost", slug],
    queryFn: () => {
      return getParticularPost({ slug });
    },
    onSuccess: (response) => {
      setBreadCrumbsData([
        { name: "Home", link: "/" },
        { name: "blog", link: "/blog" },
        { name: "Article title", link: `/blog/${slug}` },
      ]);

      setBody(
        htmlParse(response?.body)
      );
    },
  });

  //for gettting suggest post
  const { data: SuggestedPostData } = useQuery({
    queryKey: ["posts"],
    queryFn: () => {
      return getAllPost();
    },
  });


  const handelPosPhooChange = (e) => {
    const file = e.target?.files[0]
    setPhoto(file)
  }

  return (
    <div>
      {isPending ? (
        <ArticleDetailSkeleton />
      ) : isError ? (
        <ErroMessage message="Could not fetch this article" />
      ) : (
          <section className="container mx-auto max-w-5xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start">
          <article className="flex-1 flex-col ">

            <label htmlFor="postPhoto">

                <img
                src={data?.photo || images.sampleImage}
                className="rounded-2xl p-2 object-cover"
                alt="image here"
                />
            </label>

            <input type="file" name="photo" id="postPhoto" className="sr-only" onChange={handelPosPhooChange} />

            <h1 className="text-3xl">{data?.title}</h1>

            {body}
          </article>
          <div className="mt-7">
           
          </div>
        </section>
      )}
    </div>
  );
};

export default EditPost;
