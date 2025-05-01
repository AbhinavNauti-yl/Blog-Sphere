import React, { useState } from "react";
import { CiCamera } from "react-icons/ci";
import { deleteProfileAvatar, updateProfileAvatar } from "../../services/index/user.js";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

export default function ProgfileAvata({ profileData }) {
  const [avatar, setAvatar] = useState(null);
  const queryClient = useQueryClient();
  

  const handelAvatarChange = (e) => {
    const file = e.target?.files[0];
    setAvatar(file);
  };

  const handelAvatarUpdate = () => {
    const formData = new FormData();
    formData.append("avatar", avatar);
    mutateUpdateAvatar({formData});
  };

  const handelAvatarDelete = () => {
    mutateDeleteAvatar();
  };

  const { mutate: mutateUpdateAvatar, isPending: updateAvatarPending } = useMutation({
    mutationFn: ({formData}) => {
      return updateProfileAvatar({formData});
    },
    onSuccess: (response) => {
      toast.success("Avatar updated");
      queryClient.invalidateQueries(["profile"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate: mutateDeleteAvatar, isPending, isError } = useMutation({
    mutationFn: () => {
      return deleteProfileAvatar();
    },
    onSuccess: (response) => {
      toast.success("Avatar Deleted");
      queryClient.invalidateQueries(["profile"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <div className="flex flex-row items-center gap-5 my-5">
      <div className="relative w-25 h-25">
        <label
          htmlFor="profilePicture"
          className="cursor-pointer  absolute  bg-transparent rounded-full border-2 border-black p-1"
        >
          {profileData?.avatar ? (
            <img src={profileData.avatar} className="w-25 h-25 rounded-full" />
          ) : (
            <div>
              <CiCamera className="w-25 h-25 rounded-full" />
            </div>
          )}
        </label>
        <input
          type="file"
          id="profilePicture"
          className="sr-only"
          onChange={handelAvatarChange}
        />
      </div>

      <div>

        {avatar ? (
          <button
          onClick={handelAvatarUpdate}
          className=" text-xl text-green-500 outline outline-green-400 rounded-2xl px-2 hover:outline-green-700 hover:text-green-700"
          >
            Update
          </button>
        ) : (
          <button
          onClick={handelAvatarDelete}
          className=" text-xl text-red-500 outline outline-red-400 rounded-2xl px-2 hover:outline-red-700 hover:text-red-700"
          >
            Delete
          </button>
        )}
        {avatar && <p className="text-lg text-black-500">{avatar.name}</p>}
      </div>
    </div>
  );
}
