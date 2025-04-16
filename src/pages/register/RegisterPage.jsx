import React, { useEffect } from 'react'
import MainLayout from '../../components/MainLayout'
import {data, Link, useNavigate} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import { useMutation } from 'react-query'

import { signup } from '../../services/index/user'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'

export default function RegisterPage() {
  const navigate = useNavigate()
  const user = useSelector(state => state.userSlice)


  useEffect(() => {
    if(user.userInfo) {
      navigate("/")
    }
  },[user])

  const {mutate, isPending, isError} = useMutation({
    mutationFn: ({name, email, password}) => {
      return signup({name, email, password})
    },
    onSuccess: (response) => {
      if(response.status == 200) {
        toast("Registration Succesful")
        navigate("/login")
      }

    },
    onError: (error) => {
      console.warn()
      toast.error(error.message)
    }
  })


  const { register, handleSubmit, formState: {errors, isValid}, watch} = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: 'onChange',
  })

  const submitHandler = (data) => {
    
    const {name, email, password} = data
    mutate({name, email, password})
  }
  
  return (
    <MainLayout>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <form onSubmit={handleSubmit(submitHandler)} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

          <div className="mb-4">
            <label className="block mb-1 font-medium" htmlFor='name'>Name</label>
            <input
              type="text"
              id='name'
              placeholder='Enter Name'
              {...register("name", {
                minLength: {
                  value:3,
                  message: "Name must be atleast 3 character"
                },
                required: {
                  value: true,
                  message: "Name is required"
                }
              })}
              className= {`${errors.name?.message ? "focus:ring-red-500" : "focus:ring-blue-500"} w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2`}
            />
            {errors.name?.message && (
              <p className='text-sm text-red-500'>{errors?.name.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium" htmlFor='email'>Email</label>
            <input
              type="email"
              id='email'
              placeholder='Enter E-mail'
              {...register("email",{
                required: {
                  value: true,
                  message: "E-mail is required"
                }
              })}
              className= {`${errors.email?.message ? "focus:ring-red-500" : "focus:ring-blue-500"} w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2`}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium" htmlFor='password'>Password</label>
            <input
              type="password"
              id='password'
              placeholder='Enter Password'
              {...register("password", {
                minLength: {
                  value: 3,
                  message: "password should be greater than 3"
                },
                required: {
                  value: true,
                  message: "password is required"
                }
              })}
              className={`${errors.password?.message ? "focus:ring-red-500" : "focus:ring-blue-500"} w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2`}
            />
            {errors.password?.message && (
              <p className='text-sm text-red-500'>{errors?.password.message}</p>
            )}
          </div>

          <Link to="/forgot-password" className='text-sm text-blue-500'>Forgot Password !</Link>

          <button
            type="submit"
            disabled = {!isValid || isPending}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            Register
          </button>


          <div className='flex flex-row my-5 gap-2'>
            <p>Allready have an acoount?</p>
            <Link to = "/logIn" className='text-blue-500'>Log In</Link>
          </div>


        </form>
      </div>
    </MainLayout>
  );
}
