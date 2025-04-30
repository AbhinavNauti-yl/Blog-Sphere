import React, { useEffect, useState } from "react";
import { CgMenuRightAlt } from "react-icons/cg";
import { MdOutlineCloseFullscreen } from "react-icons/md";
import {  Link, useNavigate } from "react-router-dom";
import NavItem from "./NavItem";
import { useWindowSize } from "@uidotdev/usehooks";
import {toast} from 'react-hot-toast'

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AiFillDashboard } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { IoIosCreate } from "react-icons/io";
import { createPost } from "../../../../services/index/post";

export default function Header() {
  const [isMenuActive, setIsmenuActive] = useState(false);
  const [activeNavName, setActiveNavName] = useState("dashboard");

  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const windowSize = useWindowSize();

  const toggleMenuHandler = () => {
    setIsmenuActive((state) => !state);
  };

  useEffect(() => {
    if (windowSize.width < 1024) {
      setIsmenuActive(false);
    } else {
      setIsmenuActive(true);
    }
  }, [windowSize.width]);

  const handelCreateNewPost = () => {
    console.log("hello");

    mutateCreatePost();
  };

  const { mutate: mutateCreatePost, isPending } = useMutation({
    mutationFn: () => {
      return createPost();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["post"])
      navigate(`/admin/post/editPost/${data.slug}`)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  });

  return (
    <header className="flex h-fit w-full items-center justify-between p-4 lg:h-full lg:max-w-[300px] lg:flex-col lg:items-start lg:justify-start lg:p-0 z-11 ">
      <Link to="/">
        <h1 className="text-3xl text-black lg:hidden">BlogSphere</h1>
      </Link>

      <div className="corsor-pointer lg:hidden">
        {isMenuActive ? (
          <MdOutlineCloseFullscreen
            onClick={toggleMenuHandler}
            className="h-7 w-7 text-black"
          />
        ) : (
          <CgMenuRightAlt
            onClick={toggleMenuHandler}
            className="h-7 w-7 text-black"
          />
        )}
      </div>

      {isMenuActive && (
        <div className="fixed inset-0 lg:static lg:h-full lg:w-full">
          <div
            className="fixed inset-0 bg-black opacity-50 lg:hidden"
            onClick={toggleMenuHandler}
          />

          {/* underlay */}
          <div className="fixed top-0 bottom-0 left-0 z-50 w-3/4 overflow-y-auto bg-white p-4 lg:static lg:h-full lg:w-300px lg:p-6">
            <Link to="/">
              <h1 className="text-3xl lg:">BlogSphere</h1>
            </Link>
            <h4 className="mt-10 font-bold text-[#C7C7C7] ">MAIN MENU</h4>
            {/* menu items */}

            <div className="flex flex-col mt-2 gap-y-1">
              <NavItem
                title="Dashboard"
                link="/admin"
                icon={<AiFillDashboard className="text-xl" />}
                name="dashboard"
                activeNavName={activeNavName}
                setActiveNavName={setActiveNavName}
              />

              <NavItem
                title="Comments"
                link="/admin/comment"
                icon={<FaRegCommentDots className="text-xl" />}
                name="comment"
                activeNavName={activeNavName}
                setActiveNavName={setActiveNavName}
              />

              <NavItem
                title="Posts"
                link="/admin/post"
                icon={<MdDashboard className="text-xl" />}
                name="post"
                activeNavName={activeNavName}
                setActiveNavName={setActiveNavName}
              />

              <div onClick={() => handelCreateNewPost()}>
                <NavItem
                  title="New Post"
                  link="/admin/post"
                  icon={<IoIosCreate className="text-xl" />}
                  name="new Post"
                  activeNavName={activeNavName}
                  setActiveNavName={setActiveNavName}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
