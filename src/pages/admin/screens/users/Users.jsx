import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteUsers, getAllUsers } from "../../../../services/index/user";
import { FaRegUserCircle } from "react-icons/fa";
import Pagination from "../../../../components/Pagination";
import toast from "react-hot-toast";

let isFirstTime = true;

export default function Users() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const changeSearchKeyword = (e) => {
    setSearch(e.target.value);
  };

  const {
    data: usersData,
    isError,
    isPending,
    refetch,
  } = useQuery({
    queryFn: () => {
      return getAllUsers(search, currentPage);
    },
    queryKey: ["allUsers", currentPage],
    onSuccess: (usersData) => {},
    onError: (error) => {
      {
        toast(error.message);
      }
    },
  });

  const { mutate: mutateUserDelete, isPending: isDeletePending } = useMutation({
    mutationFn: ({ id }) => {
      return deleteUsers({ id });
    },
    onSuccess: (response) => {
      toast.success("User deleted");
      refetch();
      navigate("/admin/users");
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

  const handelUserDelete = ({ id }) => {
    if (window.confirm("Do you want to delete this user")) {
      mutateUserDelete({ id });
    }
  };

  return (
    <div className="z-0">
      <h1 className="text-3xl p-5">Manage Users</h1>

      <div className="w-[calc(98%)] px-5 mx-auto ">
        <div className="py-8">
          <div className="flex flex-row justify-between w-full mb-1 sm:mb-0">
            <h2 className="text-2xl leading-tight">Users</h2>
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
                    placeholder="User email..."
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
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Email
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
                    >
                      Varified
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Admin
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
                  ) : usersData?.data?.data?.length === 0 ? (
                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 ">
                      No Users Found.
                    </td>
                  ) : (
                    usersData?.data?.data?.map((User, index) => (
                      <tr key={index}>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <a href="/" className=" block">
                                {User?.avatar ? (
                                  <img
                                    alt="profil"
                                    src={User?.avatar}
                                    className="mx-auto object-cover rounded-lg h-10 w-10 "
                                  />
                                ) : (
                                  <FaRegUserCircle className="mx-auto object-cover rounded-lg h-10 w-10 text-blue-500" />
                                )}
                              </a>
                            </div>
                            <div className="ml-3">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {User?.name}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {User?.email}
                          </p>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {new Date(User.createdAt).toLocaleString("en-In", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </p>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          {User?.varified ? (
                            <p className="text-gray-900 whitespace-no-wrap">
                              ✅
                            </p>
                          ) : (
                            <p className="text-gray-900 whitespace-no-wrap">
                              ❌
                            </p>
                          )}
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          {User?.admin ? (
                            <p className="text-gray-900 whitespace-no-wrap">
                              ✅
                            </p>
                          ) : (
                            <p className="text-gray-900 whitespace-no-wrap">
                              ❌
                            </p>
                          )}
                        </td>
                        <td className="px-5 py-5 text-md bg-white border-b border-gray-200 flex-row space-x-2 ">
                          <button
                            onClick={() => handelUserDelete({ id: User?._id })}
                            className="text-red-600 hover:text-red-800 cursor-pointer"
                          >
                            Delete
                          </button>
                          {/* <Link
                            // to={`/admin/post/editPost/${post?.slug}`}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Edit
                          </Link> */}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>

              {!isPending && (
                <Pagination
                  onPageChange={(page) => setCurrentPage(page)}
                  currentPage={currentPage}
                  totalPageCount={usersData?.headers?.["x-Totalpagescount"]}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
