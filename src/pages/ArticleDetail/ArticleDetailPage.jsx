import React from "react";
import MainLayout from "../../components/MainLayout";
import BreadCrumbs from "../../components/BreadCrumbs";
import ArtticleDetailSkeleton from "./component/ArticleDetailSkeleton.jsx";
import { useParams } from "react-router-dom";
import images from "../../constants/images";
import SuggestedPost from "./continer/SuggestedPost";
import { useQuery } from "@tanstack/react-query";
import { getAllPost, getParticularPost } from "../../services/index/post.js";
import { useState } from "react";

import parse from "html-react-parser";

import { generateHTML } from "@tiptap/html";
import Bold from "@tiptap/extension-bold";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Italic from "@tiptap/extension-italic";
import ErroMessage from "../../components/ErroMessage.jsx";

// const SuggestedPostData = [
//   {
//     _id: 1,
//     image: images.p1,
//     title: "Help poor feed them daily",
//     createdAt: "10 feb",
//   },
//   {
//     _id: 2,
//     image: images.p1,
//     title: "Help poor feed them daily",
//     createdAt: "10 feb",
//   },
//   {
//     _id: 3,
//     image: images.p1,
//     title: "Help poor feed them daily",
//     createdAt: "10 feb",
//   },
// ];

const tagsData = ["Animal", "Education", "Wealth", "Nature", "Birds"];

export default function ArticleDetailPage() {
  const { slug } = useParams();

  const [breadCrumbsData, setBreadCrumbsData] = useState([]);
  const [body, setBody] = useState(null);

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
        parse(
          generateHTML(response?.body, [
            Bold,
            Paragraph,
            Italic,
            Text,
            Document,
          ])
        )
      );
    },
  });


  //for gettting suggest post
  const {data: SuggestedPostData} = useQuery({
    queryKey: ["posts"],
    queryFn: () => {
      return getAllPost()
    },
  })

  return (
    <MainLayout>
      {isPending ? (
        <ArtticleDetailSkeleton />
      ) : isError ? (
        <ErroMessage message="Could not fetch this article" />
      ) : (
        <section className="container mx-auto max-w-5xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start">
          <article className="flex-1 flex-col ">
            <BreadCrumbs data={breadCrumbsData} />

            <img
              src={data?.photo}
              className="rounded-2xl p-2 object-cover"
              alt="image here"
            />

            <h1 className="text-3xl">{data?.title}</h1>

            {body}
          </article>
          <div className="mt-7">
            <SuggestedPost
              header={"Suggested Post"}
              post={SuggestedPostData}
              tags={data?.tags}
            />
          </div>
        </section>
      )}
    </MainLayout>
  );
}
