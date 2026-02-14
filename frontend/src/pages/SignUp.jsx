import { useState } from "react";
import { Link } from "react-router";
import { api } from "../api/axios";
import { useForm } from "react-hook-form";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await api.post("/auth/signup", data);
    } catch (error) {
      const message = error.response?.data?.message;

      if (message?.toLowerCase().includes("email")) {
        setError("email", {
          type: "server",
          message,
        });
      } else {
        setError("root", {
          type: "server",
          message: message || "Something went wrong",
        });
      }
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="h-screen flex items-center justify-center"
    >
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend text-center text-2xl">SignUp</legend>

        <label className="label">Name</label>
        <input
          type="text"
          className="input outline-none"
          placeholder="Name"
          {...register("name", { required: "Name is required" })}
        />
        <p className="text-red-500 text-sm">{errors.name?.message}</p>

        <label className="label">Email</label>
        <input
          type="email"
          className="input outline-none"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Invalid email",
            },
          })}
        />
        <p className="text-red-500 text-sm">{errors.email?.message}</p>

        <label className="label">Password</label>
        <input
          type="password"
          className="input outline-none"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        <p className="text-red-500 text-sm">{errors.password?.message}</p>

        {errors.root && (
          <p className="text-red-600 text-sm text-center mt-2">
            {errors.root.message}
          </p>
        )}

        <button className="btn btn-neutral mt-4" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Account"}
        </button>

        <div className="text-center pt-5 text-[14px]">
          <span>You already have an account?</span>
          <Link to="/login" className="ml-2 text-cyan-800 hover:underline">
            Login
          </Link>
        </div>
      </fieldset>
    </form>
  );
};

export default SignUp;
