import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import {
  AiOutlineMail,
  AiOutlineEyeInvisible,
  AiOutlineEye,
} from "react-icons/ai";
import { FaSignInAlt } from "react-icons/fa";
import logo from "./../assets/logo.png";

const Login = ({ setToken }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
 
  const onSubmit = async(data)=>{
    try {
      const response = await axios.post(backendUrl + "/api/user/admin", data);
      if (response.data.success) {
        setToken(response.data.token);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-white px-10 py-8 max-w-md w-full transition-transform ">
        <div className="flex justify-center ">
          <img src={logo} alt="Logo" className="w-28 h-auto" />
        </div>

        <h1 className="text-3xl font-bold text-center mb-3 text-black">
          Welcome Back
        </h1>
        <p className="text-center text-lg text-gray-700 mb-6">
          Sign in to access your dashboard, settings <br /> and products
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className=" font-medium text-gray-700 mb-2 text-1xl block"
            >
              Email
            </label>
            <div className="flex items-center relative">
              <input
                id="email"
                {...register("email", {
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                })}
                className="w-full pr-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black transition duration-200 ease-in-out pl-8"
                type="email"
                placeholder="admin@email.com"
              />
              <div className="absolute right-3 transition-transform transform hover:scale-110">
                <AiOutlineMail className="text-gray-500" size={25} />
              </div>
            </div>
          </div>

          <div className=" relative mb-6">
            <label
              htmlFor="password"
              className="font-medium text-gray-700 text-1xl mb-2 block"
            >
              Password
            </label>
            <input
              id="password"
              {...register("password", { required: true })}
              className="w-full pr-10 py-3 pl-7 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black transition duration-200 ease-in-out"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
            />
            <div
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer mt-3 transition-transform hover:scale-110"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <AiOutlineEye size={25} className="text-gray-500" />
              ) : (
                <AiOutlineEyeInvisible size={25} className="text-gray-500" />
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[burlywood] hover:bg-black text-white font-semibold rounded-md hover:bg-burlywood transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center text-lg"
          >
            Login
            <FaSignInAlt className="ml-2" size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
