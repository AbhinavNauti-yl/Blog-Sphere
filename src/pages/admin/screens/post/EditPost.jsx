import React from "react";
import MainLayout from "../../../../components/MainLayout";
import ArticleDetailSkeleton from "../../../ArticleDetail/component/ArticleDetailSkeleton.jsx";

import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllPost,
  getParticularPost,
  updatePost,
} from "../../../../services/index/post.js";
import ErroMessage from "../../../../components/ErroMessage.jsx";
import { useState } from "react";

import { htmlParse } from "../../../../utils/htmlParser.js";
import images from "../../../../constants/images.js";
import toast from "react-hot-toast";

const EditPost = () => {
  const { slug } = useParams();

  const [body, setBody] = useState(null);
  const [photo, setPhoto] = useState(null);
  const queryClient = useQueryClient() 

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

      setBody(htmlParse(response?.body));
    },
  });

  const handelUpdatePost = () => {
    const updatedPost = new FormData();

    if (photo) {
      updatedPost.append("photo", photo);
    }
    updatedPost.append("document", JSON.stringify({}))
    
    mutateUpdatePost({slug, updatedPost})

  };

  const {mutate: mutateUpdatePost, isPending: isPostUpdatePending} = useMutation({
    mutationFn: ({slug, updatedPost}) => {
      return updatePost({slug, updatedPost})
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries(["blog", slug])
      toast.success("Post Updated")
    },
    onError: (error) => {
      toast.error(error.message )
    }
  })


  const handelPosPhooChange = (e) => {
    const file = e.target?.files[0];
    setPhoto(file);
  };

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

            <input
              type="file"
              name="photo"
              id="postPhoto"
              className="sr-only"
              onChange={handelPosPhooChange}
            />

            <h1 className="text-3xl">{data?.title}</h1>

            <div className="mt-7">{body}</div>
            <button
              disabled= {isPostUpdatePending}
              className="bg-green-600 hover:bg-green-500 text-2xl text-white px-1 rounded-3xl py-0.5 w-full disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() => handelUpdatePost()}
            >
              Update
            </button>
          </article>
        </section>
      )}
    </div>
  );
};

export default EditPost;
