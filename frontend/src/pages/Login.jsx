import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToken, selectToken } from "../store/slices/authSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { AiOutlineMail, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaSignInAlt } from "react-icons/fa";
import { useForm } from "react-hook-form";
import logo from "./../assets/logo.png"; 

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [currentState, setCurrentState] = useState("Login");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitHandler = async (data) => {

    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(backendUrl + "/api/user/register", {
          name: data.name,
          email: data.email,
          password: data.password,
        });
        if (response.data.success) {
          dispatch(setToken(response.data.token));
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + "/api/user/login", {
          email: data.email,
          password: data.password,
        });
        if (response.data.success) {
          dispatch(setToken(response.data.token));
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-white px-10 py-8 max-w-md w-full transition-transform">
        <div className="flex justify-center">
          <img src={logo} alt="Logo" className="w-28 h-auto" />
        </div>

        <h1 className="text-3xl font-bold text-center mb-3 text-black">
          {currentState === "Login" ? "Welcome Back" : "Create Account"}
        </h1>
        <p className="text-center text-lg text-gray-700 mb-6">
          {currentState === "Login"
            ? "Sign in to get your order fast"
            : "Create a new account to get started."}
        </p>

        <form onSubmit={handleSubmit(onSubmitHandler)}>
          {currentState === "Sign Up" && (
            <div className="mb-6">
              <label
                htmlFor="name"
                className="font-medium text-gray-700 mb-2 text-1xl block"
              >
                Name
              </label>
              <input
                id="name"
                {...register("name", { required: true })}
                className="w-full pr-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black transition duration-200 ease-in-out pl-4"
                type="text"
                placeholder="Your Name"
              />
              {errors.name && (
                <p className="text-red-500 mt-2">Name is required</p>
              )}
            </div>
          )}

          <div className="mb-6">
            <label
              htmlFor="email"
              className="font-medium text-gray-700 mb-2 text-1xl block"
            >
              Email
            </label>
            <div className="flex items-center relative">
              <input
                id="email"
                {...register("email", { required: true,
                  // pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                 })}
                className="w-full pr-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black transition duration-200 ease-in-out pl-8"
                type="email"
                placeholder="youremail@example.com"
                
              />
              <div className="absolute right-3 transition-transform transform hover:scale-110">
                <AiOutlineMail className="text-gray-500" size={25} />
              </div>
            </div>
            {errors.email && (
              <p className="text-red-500 mt-2">Email is required</p>
            )}
          </div>

          <div className="relative mb-6">
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
            {errors.password && (
              <p className="text-red-500 mt-2">Password is required</p>
            )}
          </div>

          <div className="w-full flex justify-between text-sm text-black mb-6">
            {currentState === "Login" ? (
              <p
                onClick={() => setCurrentState("Sign Up")}
                className="cursor-pointer hover:underline transition"
              >
                Create account
              </p>
            ) : (
              <p
                onClick={() => setCurrentState("Login")}
                className="cursor-pointer hover:underline transition"
              >
                Login Here
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[burlywood] text-white font-semibold rounded-md hover:bg-black transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center text-lg"
          >
            {currentState === "Login" ? "Login" : "Sign Up"}
            <FaSignInAlt className="ml-2" size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
