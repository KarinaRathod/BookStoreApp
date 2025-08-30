import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Login from "./Login";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function Signup() {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
    };

    try {
      const res = await axios.post("http://localhost:4001/user/signup", userInfo);
      if (res.data) {
        toast.success("Signup Successful! Redirecting to login...");
        localStorage.setItem("user", JSON.stringify(res.data.user)); // Store user info
        // You might want to navigate to login after successful signup instead of 'from' path
        document.getElementById("my_modal_3").showModal(); // Show login modal
      }
    } catch (err) {
      if (err.response) {
        console.error(err);
        toast.error("Error: " + (err.response.data.message || "Something went wrong"));
      } else {
        toast.error("Network error. Please try again.");
      }
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-800 dark:via-gray-900 dark:to-slate-950 p-4">
        <div className="bg-white dark:bg-gray-800 p-8 md:p-10 rounded-xl shadow-2xl w-full max-w-md relative transform transition-all duration-300 hover:scale-[1.01]">
          {/* Close button - styled for better visibility */}
          <Link
            to="/"
            className="absolute top-4 right-4 text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 text-2xl"
            aria-label="Close"
          >
            &times; {/* Using times symbol for a softer look */}
          </Link>

          <div className="text-center mb-8">
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2 leading-tight">
              Join Us
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Create your account to unlock exclusive features!
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Full Name */}
            <div>
              <label htmlFor="fullname" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
              <input
                id="fullname"
                type="text"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 transition-all duration-200"
                placeholder="Enter your full name"
                {...register("fullname", { required: "Full Name is required" })}
              />
              {errors.fullname && (
                <p className="mt-1 text-red-600 text-sm">{errors.fullname.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
              <input
                id="email"
                type="email"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 transition-all duration-200"
                placeholder="Enter your email"
                {...register("email", { 
                    required: "Email is required",
                    pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Invalid email address"
                    }
                })}
              />
              {errors.email && (
                <p className="mt-1 text-red-600 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
              <input
                id="password"
                type="password"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 transition-all duration-200"
                placeholder="Enter your password"
                {...register("password", { 
                    required: "Password is required", 
                    minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters"
                    }
                })}
              />
              {errors.password && (
                <p className="mt-1 text-red-600 text-sm">{errors.password.message}</p>
              )}
            </div>

            {/* Signup Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-pink-600 text-white px-5 py-2.5 rounded-lg font-semibold text-lg shadow-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200 transform active:scale-98"
              >
                Create Account
              </button>
            </div>

            <div className="text-center text-sm mt-6">
              <span className="text-gray-700 dark:text-gray-300">
                Already have an account?{" "}
              </span>
              <button
                type="button"
                className="text-blue-600 dark:text-blue-400 font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors duration-200"
                onClick={() => document.getElementById("my_modal_3").showModal()}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Login Modal */}
      
      <dialog id="my_modal_3" className="modal">
      <Login modalRef={{ current: document.getElementById("my_modal_3") }} />
      </dialog>
      <Login />
    </>
  );
}

export default Signup;