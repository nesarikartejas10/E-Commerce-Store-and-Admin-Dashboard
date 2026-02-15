import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { api } from "../api/axios";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    global: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", formData);
      toast.success(response?.data?.message);
      setFormData({ email: "", password: "" });
    } catch (error) {
    } finally {
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="h-screen flex items-center justify-center"
    >
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend text-center text-2xl">Login</legend>

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

        <button className="btn btn-neutral mt-4">Login</button>

        <div className="text-center pt-5 text-[14px]">
          <span>You don't have an account?</span>
          <Link to="/signup" className="ml-2 text-cyan-800 hover:underline">
            SignUp
          </Link>
        </div>
      </fieldset>
    </form>
  );
};

export default Login;
