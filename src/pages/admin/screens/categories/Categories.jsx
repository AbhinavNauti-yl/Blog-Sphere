import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import {
  createPostCategory,
  deletedPostCategory,
  getAllPostCategories,
} from "../../../../services/index/postCategories";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "../../../../components/Pagination";
import toast from "react-hot-toast";

let isFirstTime = true;

export default function Categories() {
  const queryClient = useQueryClient();
  const [newCategory, setNewCategory] = useState("");
  const createCategory = () => {
    const category = newCategory;
    mutate(category);
  };
  const { mutate, isPending, isError } = useMutation({
    mutationFn: (category) => {
      return createPostCategory(category);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["postCategory"]);
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const changeSearchKeyword = (e) => {
    setSearch(e.target.value);
  };

  const {
    data: postCategoryData,
    isError: postCategoryDataError,
    isPending: postCategoryDataPending,
    refetch,
  } = useQuery({
    queryFn: () => {
      return getAllPostCategories(search, currentPage);
    },
    queryKey: ["postCategory", currentPage],
    onSuccess: (postCategoryData) => {},
    onError: (error) => {
      {
        toast(error.message);
      }
    },
  });

  const { mutate: mutatePostCategoryDelete, isPending: isDeletePending } =
    useMutation({
      mutationFn: ({ _id }) => {
        return deletedPostCategory({ _id });
      },
      onSuccess: (response) => {
        console.log(response?.data?.acknowledged);
        if (response?.data?.acknowledged) {
          toast.success("Post Category deleted");
          refetch();
          navigate("/admin/categories");
        }
      },
      onError: (response) => {
        toast.error(response.message);
      },
    });

  useEffect(() => {
    if (isFirstTime) {
      isFirstTime = false;
      return;
    }

    refetch;
  }, [refetch, currentPage]);

  const makeSearchUsingSearchKeyword = (e) => {
    e.preventDefault();
    refetch();
    setCurrentPage(1);
  };

  const handelDelete = ({ _id }) => {
    mutatePostCategoryDelete({ _id });
  };

  return (
    <>
      <h1 className="text-3xl text-black m-5">Manage Categories</h1>
      <div className="flex flex-col p-5 gap-10 items-center">
        <div className="flex flex-col mt-5 w-[calc(50%)] items-start lg:w-[calc(30%)]">
          <input
            type="text"
            onChange={(e) => {
              setNewCategory(e.target.value);
            }}
            placeholder="New Category"
            value={newCategory}
            className=" border border-slate-300  bg-white rounded-lg p-2 outline-none w-full "
          />
          <button
            disabled={isPending}
            className="bg-green-600 hover:bg-green-500  text-white px-1 rounded-3xl py-0.5 disabled:cursor-not-allowed disabled:opacity-50 mt-7  w-full"
            onClick={() => createCategory()}
          >
            Create
          </button>
        </div>

        <div className="w-[calc(98%)] px-5 mx-auto ">
          <div className="py-8">
            <div className="flex flex-row justify-between w-full mb-1 sm:mb-0">
              <h2 className="text-2xl leading-tight">Categories</h2>
              <div className="text-end">
                <form
                  onSubmit={makeSearchUsingSearchKeyword}
                  className="flex flex-col justify-center w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0"
                >
                  <div className=" block ">
                    <input
                      type="text"
                      id='"form-subscribe-Filter'
                      className=" rounded-lg  flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="Category Title..."
                      onChange={changeSearchKeyword}
                      value={search}
                    />
                  </div>
                  <button
                    className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                    type="submit"
                  >
                    Filter
                  </button>
                </form>
              </div>
            </div>
            <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
              <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                      >
                        Created at
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                      ></th>
                    </tr>
                  </thead>
                  <tbody>
                    {isPending ? (
                      <tr>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 ">
                          Loading...
                        </td>
                      </tr>
                    ) : postCategoryData?.data?.data?.length === 0 ? (
                      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 ">
                        No Category Found.
                      </td>
                    ) : (
                      postCategoryData?.data?.data.map((category, index) => (
                        <tr key={index}>
                          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <div className="flex items-center">
                              <div className="ml-3">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {category?.title}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {new Date(category.createdAt).toLocaleString(
                                "en-In",
                                {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                }
                              )}
                            </p>
                          </td>
                          <td className="px-5 py-5 text-md bg-white border-b border-gray-200 flex-row space-x-2 ">
                            <button
                              onClick={() =>
                                handelDelete({ _id: category?._id })
                              }
                              className="text-red-600 hover:text-red-800 cursor-pointer"
                            >
                              Delete
                            </button>
                            <Link
                              to={`/admin/categories/editCategory/${category?._id}`}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Edit
                            </Link>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>

                {!postCategoryDataPending && (
                  <Pagination
                    onPageChange={(page) => setCurrentPage(page)}
                    currentPage={currentPage}
                    totalPageCount={JSON.parse(
                      postCategoryData?.headers?.["x-totalPagesCount"]
                    )}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
