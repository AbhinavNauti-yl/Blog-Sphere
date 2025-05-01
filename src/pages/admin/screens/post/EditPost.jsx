import React, { useEffect } from "react";
import ArticleDetailSkeleton from "../../../ArticleDetail/component/ArticleDetailSkeleton.jsx";

import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getParticularPost,
  updatePost,
} from "../../../../services/index/post.js";
import ErroMessage from "../../../../components/ErroMessage.jsx";
import { useState } from "react";
import images from "../../../../constants/images.js";
import toast from "react-hot-toast";
import Editor from "../../../../components/editor/Editor.jsx";
import MultiSelectDropDown from "../../components/selectDropDown/MultiSelectDropDown.jsx";
import { getAllPostCategories } from "../../../../services/index/postCategories.js";
import {
  categoryToOptions,
  filterCategories,
} from "../../../../utils/multiSelect.js";

const promisOption = async (inputValue) => {
  const categories = await getAllPostCategories();
  return filterCategories(inputValue, categories);
};

const EditPost = () => {
  const { slug } = useParams();
  const queryClient = useQueryClient();

  const [body, setBody] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");

  // for getting a particular post
  const { data, isError, isPending } = useQuery({
    queryKey: ["newPost", slug],
    queryFn: () => {
      return getParticularPost({ slug });
    }
  });
  
  useEffect(() => {
    setCategories(data?.categories.map((item) => item._id));
    setCaption(data?.caption);
    setTitle(data?.title);
  },[data])

  const handelUpdatePost = () => {
    const updatedPost = new FormData();
    if (photo) {
      updatedPost.append("photo", photo);
    }
    updatedPost.append(
      "document",
      JSON.stringify({ body, categories, caption, title })
    );
    mutateUpdatePost({ slug, updatedPost });
  };

  const { mutate: mutateUpdatePost, isPending: isPostUpdatePending } =
    useMutation({
      mutationFn: ({ slug, updatedPost }) => {
        return updatePost({ slug, updatedPost });
      },
      onSuccess: (response) => {
        queryClient.invalidateQueries(["blog", slug]);
        toast.success("Post Updated");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

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

            {/* title */}
            <div className="mt-3 flex flex-col">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                value={title || ""}
                onChange={(e) => setTitle(e.target.value)}
                className="text-3xl border border-slate-300  bg-white rounded-lg p-2 outline-none"
                placeholder="Title of the post"
              />
            </div>

            {/* caption */ }
            <div className="mt-3 flex flex-col">
              <label htmlFor="caption">Caption</label>
              <input
                type="text"
                id="caption"
                value={caption || ""}
                onChange={(e) => setCaption(e.target.value)}
                className="text-3xl border border-slate-300  bg-white rounded-lg p-2 outline-none"
                placeholder="Caption of the Post"
              />
            </div>

            <div className="mt-3 z-12">
            <label>Category</label>
              <MultiSelectDropDown
                loadOptions={promisOption}
                defaultValue={data.categories.map(categoryToOptions)}
                onChange={(newValue) =>
                  setCategories(newValue.map((item) => item.value))
                }
              />
            </div>

            <div className="mt-7">
              <Editor
                content={data?.body}
                editable={true}
                onDataChange={(data) => {
                  setBody(data);
                }}
              />
            </div>
            <button
              disabled={isPostUpdatePending}
              className="bg-green-600 hover:bg-green-500 text-2xl text-white px-1 rounded-3xl py-0.5 w-full disabled:cursor-not-allowed disabled:opacity-50 mt-7"
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
