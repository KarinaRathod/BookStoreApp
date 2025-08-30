import React from 'react';
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useId } from "react";

function Login({ modalRef }) {
  const navigate = useNavigate();
  const formId = useId();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:4001/user/login", {
        email: data.username,
        password: data.password,
      });

      const { user, token } = res.data;

      if (user && token) {
        toast.success(`${user.role === "admin" ? "Admin" : "User"} Login Successful!`);

        // ✅ Save token and user separately
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);

        if (modalRef?.current) modalRef.current.close();

        navigate(user.role === "admin" ? "/admin-dashboard" : "/");
      } else {
        toast.error("Invalid user data received.");
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="modal-box dark:bg-slate-800 p-8 rounded-lg shadow-lg w-full max-w-md relative">
      {modalRef && (
        <form method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => modalRef.current?.close()}
          >
            ✕
          </button>
        </form>
      )}

      <div className="text-center mb-8">
        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2 leading-tight">
          Welcome Back!
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Sign in to your account
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label
            htmlFor={`${formId}-username`}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Username
          </label>
          <input
            id={`${formId}-username`}
            type="text"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:text-white"
            placeholder="Enter your username"
            {...register("username", { required: "Username is required" })}
          />
          {errors.username && (
            <p className="mt-1 text-red-600 text-sm">{errors.username.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor={`${formId}-password`}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Password
          </label>
          <input
            id={`${formId}-password`}
            type="password"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:text-white"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <p className="mt-1 text-red-600 text-sm">{errors.password.message}</p>
          )}
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all"
          >
            Login
          </button>
        </div>

        <div className="text-center text-sm mt-6">
          <span className="text-gray-700 dark:text-gray-300">
            Don't have an account?{" "}
          </span>
          <Link
            to="/signup"
            className="text-pink-600 dark:text-pink-400 font-medium hover:underline"
            onClick={() => modalRef?.current?.close()}
          >
            Signup
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
