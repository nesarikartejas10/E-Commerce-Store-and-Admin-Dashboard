import { toast } from "react-toastify";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { api } from "../api/axios";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    global: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validateSignup = () => {
    let newErrors = {};

    if (!formData.name) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

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
    setErrors({});

    if (!validateSignup()) return;

    try {
      setLoading(true);
      const response = await api.post("/auth/signup", formData);
      toast.success(response?.data?.message);

      setFormData({
        name: "",
        email: "",
        password: "",
      });
      setErrors({});

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setErrors({
        global: error.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="h-screen flex items-center justify-center"
    >
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend text-center text-2xl">SignUp</legend>
        {errors.global && (
          <p className="text-red-500 text-sm">{errors.global}</p>
        )}
        <label className="label">Name</label>
        <input
          type="text"
          className="input outline-none"
          placeholder="Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

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

        <button className="btn btn-neutral mt-4" disabled={loading}>
          {loading ? "Creating..." : "Create Account"}
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
