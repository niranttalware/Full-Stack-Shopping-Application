import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/shopping-icon-1.webp";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const { login, loadUser, user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    loadUser(); // load user ONLY once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user) navigate("/"); // navigate when user is present
  }, [user, navigate]);

  const validateField = (
    field: "email" | "password",
    value: string
  ): string => {
    const v = value.trim();

    switch (field) {
      case "email":
        if (!v) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))
          return "Please enter a valid email address";
        return "";

      case "password":
        if (!v) return "Password is required";
        if (v.length < 6) return "Password must be at least 6 characters";
        return "";

      default:
        return "";
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Please enter a valid email address";

    if (!password.trim()) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const ok = await login({ email, password });
    if (ok) {
      const loggedInUser = useAuthStore.getState().user;

      if (loggedInUser?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-blue-200 to-gray-200 flex flex-col items-center pt-2">
      {/* 🔥 Mini Header (Brand) */}
      <div className="w-full sticky top-0 z-50 bg-gradient-to-br from-gray-200 to-blue-200 p-3 flex items-center gap-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="logo"
            className="w-11 h-11 object-contain drop-shadow-md"
          />

          {/* Brand Title + Tagline */}
          <div className="flex flex-col leading-tight">
            <h1 className="text-2xl font-extrabold text-gray-700">MyShop</h1>
            <p className="text-gray-500 text-xs mt-1">
              Your Favorite Shopping Destination
            </p>
          </div>
        </Link>
      </div>

      {/* Form Container */}
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md transition-transform hover:scale-[1.01] mt-4 mb-20">
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-700">
          Sign In
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                const value = e.target.value;
                setEmail(value);
                const fieldError = validateField("email", value);
                setErrors((prev) => {
                  if (!fieldError) {
                    const { email, ...rest } = prev;
                    return rest;
                  }
                  return { ...prev, email: fieldError };
                });
              }}
              className={`border w-full px-4 py-2 rounded-md outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-indigo-500"
              }`}
            />
            <div className="h-5">
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 absolute">
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                const value = e.target.value;
                setPassword(value);
                const fieldError = validateField("password", value);
                setErrors((prev) => {
                  if (!fieldError) {
                    const { password, ...rest } = prev;
                    return rest;
                  }
                  return { ...prev, password: fieldError };
                });
              }}
              className={`border w-full px-4 py-2 rounded-md outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-indigo-500"
              }`}
            />
            <div className="h-5">
              {errors.password && (
                <p className="text-red-500 text-xs mt-1 absolute">
                  {errors.password}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-all"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-5 text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
