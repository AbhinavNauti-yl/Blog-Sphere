import React from "react";
import MainLayout from "../../components/MainLayout";
import BreadCrumbs from "../../components/BreadCrumbs";
import { useParams } from "react-router-dom";
import images from "../../constants/images";
import SuggestedPost from "./continer/SuggestedPost";
import { useQuery } from "@tanstack/react-query";
import { getParticularPost } from "../../serveices/index/post.js";
import { useState } from "react";


const SuggestedPostData = [
  {
    _id: 1,
    image: images.p1,
    title: "Help poor feed them daily",
    createdAt: "10 feb",
  },
  {
    _id: 2,
    image: images.p1,
    title: "Help poor feed them daily",
    createdAt: "10 feb",
  },
  {
    _id: 3,
    image: images.p1,
    title: "Help poor feed them daily",
    createdAt: "10 feb",
  },
];

const tagsData = ["Animal", "Education", "Wealth", "Nature", "Birds"];

export default function ArticleDetailPage() {
  const { slug } = useParams();

  const [breadCrumbsData, setBreadCrumbsData] = useState([])

  const { data, isError, isPending } = useQuery({
    queryFn: () => {
      setBreadCrumbsData([
        { name: "Home", link: "/" },
        { name: "blog", link: "/blog" },
        { name: "Article title", link: `/blog/${slug}` }
      ])
      return getParticularPost({ slug });
    },
    onSuccess: (response) => {
      console.log("check1")
    },
    queryKey: ["newPost"],
  });

  return (
    <MainLayout>
      <section className="flex flex-col container mx-auto p-4 max-w-fit lg:flex-row gap-x-5">
        <article className="flex flex-col ">
          <BreadCrumbs data={breadCrumbsData} />

          <img src={data?.photo} className="rounded-2xl p-2 object-cover" alt="image here" />

          <h1 className="text-3xl">{data?.title}</h1>

          <p className="py-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
            ipsam eum minima soluta quibusdam illum ut id accusantium ducimus,
            vel fugiat facere adipisci quam officia. Beatae rem placeat porro
            unde, expedita a corporis libero quod et doloremque provident
            labore. Porro labore quisquam quod, aspernatur iste architecto
            consectetur! Laudantium illum, commodi unde provident id, nam eos
            fuga saepe fugiat eius accusantium libero quod corporis recusandae?
            Iure repellendus delectus hic, ex at eum veritatis. Consequuntur
            molestias tempore amet soluta iste obcaecati blanditiis laudantium.
            Assumenda cumque, ratione ab voluptate culpa fuga? Obcaecati ullam
            omnis atque dicta aliquam dolorem sunt in minima modi nemo.
          </p>
        </article>
        <SuggestedPost
          header={"Suggested Post"}
          post={SuggestedPostData}
          tags={tagsData}
        />
      </section>
    </MainLayout>
  );
}
