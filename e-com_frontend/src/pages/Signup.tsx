import React, { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import logo from "../assets/shopping-icon-1.webp";

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cityname, setCityName] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { signup, loadUser } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  // ✅ Validate a single field
  const validateField = (field: string, value: string): string => {
    const v = value.trim();

    switch (field) {
      case "name":
        if (!v) return "Full name is required";
        if (!/^[A-Za-z\s]+$/.test(v))
          return "Name can only contain letters and spaces";
        return "";

      case "email":
        if (!v) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))
          return "Please enter a valid email address";
        return "";

      case "password":
        if (!v) return "Password is required";
        if (v.length < 6) return "Password must be at least 6 characters";
        return "";

      case "confirmPassword":
        if (!v) return "Please confirm your password";
        if (v !== password) return "Passwords do not match";
        return "";

      case "cityname":
        if (!v) return "City is required";
        if (!/^[A-Za-z\s]+$/.test(v)) return "Please enter a valid city name";
        return "";

      default:
        return "";
    }
  };

  // ✅ Validate all fields before submit
  const validate = () => {
    const fields = { name, email, password, confirmPassword, cityname };
    const newErrors: Record<string, string> = {};
    const requiredFields: string[] = [];

    (Object.keys(fields) as (keyof typeof fields)[]).forEach((field) => {
      const error = validateField(field, fields[field]);
      if (error) newErrors[field] = error;
    });

    setErrors(newErrors);

    if (requiredFields.length === 1) {
      toast.error("Please fill all required fields ⚠️", {
        position: "top-center",
      });
      return false;
    }
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const ok = await signup({ email, name, password, city: cityname });

    if (ok) {
      navigate("/login"); // toast handled in store
    }
  };

  // ✅ Handle real-time change + validation
  const handleChange = (field: string, value: string) => {
    switch (field) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      case "cityname":
        setCityName(value);
        break;
      default:
        break;
    }

    const fieldError = validateField(field, value);
    setErrors((prev) => {
      if (!fieldError) {
        const { [field]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [field]: fieldError };
    });
  };

  const fieldClasses = (field: string) =>
    `border w-full px-4 py-2 rounded-md outline-none focus:ring-2 ${
      errors[field]
        ? "border-red-500 focus:ring-red-400"
        : "border-gray-300 focus:ring-blue-500"
    }`;

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
              Create your account to start shopping!
            </p>
          </div>
        </Link>
      </div>

      {/* Form Container */}
      <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-3xl transition-transform hover:scale-[1.01]">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
          Create Your Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => handleChange("name", e.target.value)}
                className={fieldClasses("name")}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1 absolute">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => handleChange("email", e.target.value)}
                className={fieldClasses("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 absolute">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => handleChange("password", e.target.value)}
                className={fieldClasses("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1 absolute">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) =>
                  handleChange("confirmPassword", e.target.value)
                }
                className={fieldClasses("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1 absolute">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* City */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="City"
                value={cityname}
                onChange={(e) => handleChange("cityname", e.target.value)}
                className={fieldClasses("cityname")}
              />
              {errors.cityname && (
                <p className="text-red-500 text-xs mt-1 absolute">
                  {errors.cityname}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition-all"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
