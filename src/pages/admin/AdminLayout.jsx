import React, { useEffect } from "react";
import Header from "./components/header/Header";
import { data, Outlet, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../services/index/user";
import { toast } from "react-hot-toast";

export default function AdminLayout() {
  const navigate = useNavigate();

  const {
    data: profileData,
    isPending,
    isError,
  } = useQuery({
    queryFn: () => {
      return getProfile();
    },
    queryKey: ["profile"],
    onSuccess: (response) => {
      console.log(response);
      if (!response?.admin) {
        navigate("/");
        toast("Not an admin");
      }
    },
  });


  if(isPending) {
    return (
      <div className="text-2xl ">loading</div>
    )
  }

  return (
    <div className="flex flex-col h-full min-h-screen lg:flex-row">

      <Header />
      <main className="bg-[#ebe7e7] flex-1  ">
        <Outlet />
      </main>
    </div>
  );
}
