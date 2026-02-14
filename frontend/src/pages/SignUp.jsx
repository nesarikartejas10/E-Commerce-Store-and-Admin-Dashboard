import { useState } from "react";
import { Link } from "react-router";
import { api } from "../api/axios";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/signup", formData);
    } catch (error) {}
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="h-screen flex items-center justify-center"
    >
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend text-center text-2xl">SignUp</legend>

        <label className="label">Name</label>
        <input
          type="text"
          className="input outline-none"
          placeholder="Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />

        <label className="label">Email</label>
        <input
          type="email"
          className="input outline-none"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />

        <label className="label">Password</label>
        <input
          type="password"
          className="input outline-none"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />

        <button className="btn btn-neutral mt-4">Create Account</button>

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
