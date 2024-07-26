import React, { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../features/user/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();


  

  const validateForm = () => {
    const newErrors = {};

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!emailPattern.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    setShowError(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      dispatch(setUser({ email }));
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-blue-600">
      <div className="bg-transparent border p-5 rounded">
        <div className="text-center py-5">
          <h1 className="text-2xl font-bold text-white">Login</h1>
        </div>
        <div className="py-5">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="text-white">
                Email
              </label>
              <input
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                value={email}
                className="w-full border p-1 rounded"
              />
              {showError.email && (
                <p className="text-red-500">{showError.email}</p>
              )}
            </div>
            <div className="mb-3 relative">
              <label htmlFor="password" className="text-white">
                Password
              </label>
              <input
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                value={password}
                className="w-full border p-1 rounded"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-8 text-gray-500"
              >
                {showPassword ? <LuEyeOff /> : <LuEye />}
              </button>
              {showError.password && (
                <p className="text-red-500">{showError.password}</p>
              )}
              <div className="text-end">
                <p className="text-white text-sm cursor-pointer hover:text-gray-300">
                  Forgot password?
                </p>
              </div>
            </div>
            <div className="py-5">
              <button
                type="submit"
                className="w-full bg-blue-500 p-1 rounded text-white hover:bg-blue-400"
              >
                Login
              </button>
            </div>
          </form>
          <div className="text-center">
            <p className="text-sm text-gray-400">
              You don't have an account?{" "}
              <span className="text-white cursor-pointer">
                <Link to="/signup">Sign up</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
