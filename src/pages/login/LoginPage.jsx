import React, { useEffect } from "react";
import MainLayout from "../../components/MainLayout";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/index/user";
import { useMutation } from "react-query";
import {useDispatch, useSelector} from "react-redux"
import toast from "react-hot-toast";
import { setUserInfo } from "../../store/slices/user.slice";

export default function LoginPage() {

  const user = useSelector(state => state.userSlice)

  useEffect(() => {
    
    if(user.userInfo) {
      navigate("/")
    }
  },[user])
  
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });


  const {mutate, isPending, isError} = useMutation( {
    mutationFn: ({email, password}) => {
      return login({email, password})
    },
    onSuccess: (response) => {
      dispatch(setUserInfo(response.data))
      localStorage.setItem("account", JSON.stringify(response.data.data))
    },
    onError: (error) => {
      toast.error(error.message)
      navigate("/")
    }
  })

  const submitHandler = async (data) => {
    const { email, password } = data;
    mutate({ email, password })
    
  };

  return (
    <MainLayout>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
        >
          <h2 className="text-2xl font-bold text-center mb-6">Log In</h2>

          <div className="mb-4">
            <label className="block mb-1 font-medium" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter E-mail"
              {...register("email", {
                required: {
                  value: true,
                  message: "E-mail is required",
                },
              })}
              className={`${
                errors.email?.message
                  ? "focus:ring-red-500"
                  : "focus:ring-blue-500"
              } w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2`}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              {...register("password", {
                minLength: {
                  value: 3,
                  message: "password should be greater than 3",
                },
                required: {
                  value: true,
                  message: "password is required",
                },
              })}
              className={`${
                errors.password?.message
                  ? "focus:ring-red-500"
                  : "focus:ring-blue-500"
              } w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2`}
            />
            {errors.password?.message && (
              <p className="text-sm text-red-500">{errors?.password.message}</p>
            )}
          </div>

          <Link to="/forgot-password" className="text-sm text-blue-500">
            Forgot Password !
          </Link>

          <button
            type="submit"
            disabled={!isValid || isPending}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            Log In
          </button>

          <div className="flex flex-row my-5 gap-2">
            <p>Dont have an acoount?</p>
            <Link to="/register" className="text-blue-500">
              Register
            </Link>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}
