import React, { useEffect, useState } from "react";

import { CgMenuRightAlt } from "react-icons/cg";
import { MdOutlineCloseFullscreen } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/index/user";
import toast from "react-hot-toast";
import { resetUserInfo } from "../store/slices/user.slice";



const navItemInfo = [
  { name: "Home", to: "/" },
  { name: "Blog", to: "/blog" },
  { name: "Pricing", to: "/pricing" },
];

function Header() {
  const [isNavVisible, setNavVisible] = useState(false);
  const chaneVisiblity = () => {
    setNavVisible((current) => {
      return !current;
    });
  };

  const user = useSelector((state) => state.userSlice);

  const navigate = useNavigate();
  const toSignUp = () => {
    navigate("/register");
  };

  const toLogin = () => {
    navigate("/login");
  };

  const toDashbord = () => {
    navigate('/admin')
  }


  const dispatch = useDispatch();
  const logoutUser = () => {
    const response = logout();
    dispatch(resetUserInfo(response.data));
  };

  return (
    <div className="sticky left-0 right-0 top-0 z-51 bg-[#023047]">
      <section>
        <header className="container mx-auto px-5 flex justify-between py-4">
          <Link to="/">
            <h1 className="text-3xl text-white">BlogSphere</h1>
          </Link>

          <div className="lg:hidden z-50">
            {isNavVisible ? (
              <MdOutlineCloseFullscreen
                onClick={chaneVisiblity}
                className="h-7 w-7 text-white"
              />
            ) : (
              <CgMenuRightAlt
                onClick={chaneVisiblity}
                className="h-7 w-7 text-white"
              />
            )}
          </div>

          <div
            className={`${
              isNavVisible ? "right-0" : "-right-full"
            } flex flex-col lg:flex-row justify-center lg:justify-end fixed w-full lg:w-auto  top-0 bottom-0 gap-5 z-49 lg:static text-2xl items-center transition-all duration-200 g-5 bg-[#023047]`}
          >
            <ul className="flex flex-col lg:flex-row gap-10 items-center">
              {navItemInfo.map((items, index) => (
                <li className="group" key={index}>
                  <Link to={items?.to} className="text-white">
                    {items.name}
                  </Link>
                  <span className="text-blue-500 opacity-0 transition-all duration-500 right-0 top-0 relative group-hover:text-black group-hover:opacity-100 group-hover:right-[100%]">
                    |
                  </span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => toSignUp()}
              className={`${
                user.userInfo ? "hidden disabled" : "block"
              }  border-1 text-cyan-400 px-3 rounded-2xl hover:bg-blue-400 hover:text-white hover:transition-all duration-150 w-30`}
            >
              Sign Up
            </button>

            

            <button
              onClick={() => toLogin()}
              className={`${
                user.userInfo ? "hidden disabled" : "block"
              }  border-1 text-cyan-400 px-3 rounded-2xl hover:bg-blue-400 hover:text-white hover:transition-all duration-150 w-30`}
            >
              Log In
            </button>

            {user?.userInfo && (
              <button
                onClick={() => toDashbord()}
                className={` border-1 text-cyan-400 px-3 rounded-2xl hover:bg-blue-400 hover:text-white hover:transition-all duration-150 w-30`}
              >
                Dashbord
              </button>
            )}

            <button
              onClick={() => logoutUser()}
              className={`${
                !user.userInfo ? "hidden disabled" : "block"
              }  border-1 text-cyan-400 px-3 rounded-2xl hover:bg-blue-400 hover:text-white hover:transition-all duration-150 w-30`}
            >
              Log out
            </button>
          </div>
        </header>
      </section>
    </div>
  );
}

export default Header;
