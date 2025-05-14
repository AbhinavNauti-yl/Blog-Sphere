import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../../services/index/user";
import { CiCamera } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

export default function Admin() {

  const navigate = useNavigate()
  
  const {
    data: userData,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => {
      return getProfile();
    },
  });

  const handelEditProfile = () => {
    navigate("/profile");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-lg p-6 max-w-3xl w-full flex flex-col md:flex-row gap-8">
        {/* Profile Image */}
        <div className="flex justify-center md:justify-start">
          {userData?.avatar ? (
            <img
              src={userData?.avatar}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-blue-500"
            />
          ) : (
            <CiCamera className="w-32 h-32 rounded-full border-4 border-black-500" />
          )}
        </div>

        {/* User Info */}
        <div className="flex-1 space-y-4">
          <div>
            <h2 className="text-3xl font-bold">{userData?.name}</h2>
            {userData?.admin ? (
              <p className="text-blue-500">Admin</p>
            ) : (
              <p className="text-blue-500">User</p>
            )}
            <p className="text-blue-600 font-medium">{userData?.role}</p>
          </div>

          <div className="text-gray-700">
            <p>
              <strong>Email:</strong> {userData?.email}
            </p>
            <p>
              <strong>Joined:</strong>{" "}
              <span>
                {new Date(userData?.createdAt).toLocaleString("en-In", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </p>
            <p>
              <strong>Varified:</strong>{" "}
              <span>{userData?.varified ? "Yes" : "No"}</span>
            </p>
          </div>

          {/* <div>
            <p className="text-gray-600 italic">"{userData.bio}"</p>
          </div> */}

          <div className="flex gap-4 mt-4">
            <button
              onClick={handelEditProfile}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
