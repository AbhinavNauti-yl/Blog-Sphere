import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  getPostCategory,
  updatedPostCategory,
} from "../../../../services/index/postCategories";
import { data, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

export default function EditCategories() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [newTitle, setNewTitle] = useState("");
  const { id } = useParams();

  const { data: CategoryData } = useQuery({
    queryKey: ["category", id],
    queryFn: () => {
      return getPostCategory({ id });
    },
  });

  const handelPostCategoryChange = () => {
    mutateUpdataCategory(newTitle, { id });
  };

  const {
    mutate: mutateUpdataCategory,
    isPending,
    isError,
  } = useMutation({
    queryKey: ["postCategory"],
    mutationFn: () => {
      updatedPostCategory(newTitle, { id });
    },
    onSuccess: () => {
      toast.success("Category changed");
      queryClient.invalidateQueries(["postCategory", "category"]);
      navigate("/admin/categories");
    },
    onError: (error) => {
      toast.error(error.message);
      navigate("/admin/categories");
    },
  });

  return (
    <div className="p-10">
      <h1 className="text-3xl text-black mt-5">Edit Category</h1>

      <div className="flex flex-col mt-5 w-[calc(50%)] items-start lg:w-[calc(30%)]">
        <input
          type="text"
          onChange={(e) => {
            setNewTitle(e.target.value);
          }}
          placeholder="New Category"
          defaultValue={CategoryData?.title}
          className=" border border-slate-300  bg-white rounded-lg p-2 outline-none w-full "
        />
        <button
          disabled={isPending}
          className="bg-green-600 hover:bg-green-500  text-white px-1 rounded-3xl py-0.5 disabled:cursor-not-allowed disabled:opacity-50 mt-7  w-full"
          onClick={() => handelPostCategoryChange()}
        >
          Update
        </button>
      </div>
    </div>
  );
}
