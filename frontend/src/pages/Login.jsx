import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { api } from "../api/axios";
import { toast } from "react-toastify";
import PageLoader from "../components/PageLoader";

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

  const validateLogin = () => {
    let newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors({ ...newErrors });
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({
      email: "",
      password: "",
      global: "",
    });

    if (!validateLogin()) return;
    try {
      setLoading(true);
      const response = await api.post("/auth/login", formData);
      if (response?.data?.token) {
        localStorage.setItem("access_token", response.data.token);
      }

      setFormData({ email: "", password: "" });
      setErrors({
        email: "",
        password: "",
        global: "",
      });

      toast.success(response?.data?.message);

      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (error) {
      setErrors({
        global: error.response?.data?.message || "somethimg went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="h-screen flex items-center justify-center"
    >
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend text-center text-2xl">Login</legend>

        {errors.global && (
          <p className="text-red-500 text-sm text-center">{errors.global}</p>
        )}

        <label className="label">Email</label>
        <input
          type="email"
          className="input outline-none"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        <label className="label">Password</label>
        <input
          type="password"
          className="input outline-none"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}

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
