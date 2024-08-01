import React, { useState } from "react";
import { PiEyeThin, PiEyeSlashThin } from "react-icons/pi";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { signupValidation } from "../../validation/yupSignupValidation";
import { IoLockClosedOutline } from "react-icons/io5";
import { TfiEmail } from "react-icons/tfi";
import { FiUser } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialValues = {
  userName: "",
  email: "",
  password: "",
  cPassword: "",
};

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signupValidation,
    });

  return (
    <div className="flex justify-center items-center h-screen bg-black/65 text-white">
      <div className="bg-black/10 w-1/4 rounded-3xl">
        <div className="bg-black/20 text-center p-5 rounded-t-3xl">
          <h2 className="uppercase">user signup</h2>
        </div>
        <div className="p-5">
          <form onSubmit={handleSubmit}>
            <div className="mb-5 relative">
              <input
                onChange={handleChange}
                onBlur={handleBlur}
                name="userName"
                value={values.userName}
                type="text"
                placeholder="Name"
                className="border-b-2 bg-transparent w-full pl-5 pb-3 outline-none"
              />
              <div className="absolute top-1 left-0 text-gray-400">
                <FiUser />
              </div>
              {errors.userName && touched.userName && (
                <small className="text-red-500">{errors.userName}</small>
              )}
            </div>
            <div className="mb-5 relative">
              <input
                onChange={handleChange}
                onBlur={handleBlur}
                type="email"
                name="email"
                value={values.email}
                placeholder="Email ID"
                className="border-b-2 bg-transparent w-full pl-5 pb-3 outline-none"
              />
              <div className="absolute top-1 left-0 text-gray-400">
                <TfiEmail />
              </div>
              {errors.email && touched.email && (
                <small className="text-red-500">{errors.email}</small>
              )}
            </div>
            <div className="mb-5 relative">
              <input
                onChange={handleChange}
                onBlur={handleBlur}
                name="password"
                value={values.password}
                type="password"
                placeholder="Password"
                className="border-b-2 bg-transparent w-full pl-5 pb-3 outline-none"
              />
              <div className="absolute top-1 left-0 text-gray-400">
                <IoLockClosedOutline />
              </div>
              {errors.password && touched.password && (
                <small className="text-red-500">{errors.password}</small>
              )}
            </div>
            <div className="mb-3 relative">
              <input
                onChange={handleChange}
                onBlur={handleBlur}
                name="cPassword"
                value={values.cPassword}
                type={showPassword ? "text" : "password"}
                placeholder="Confirm password"
                className="border-b-2 bg-transparent w-full pl-5 pb-3 outline-none"
              />
              <div className="absolute top-1 right-2 max-sm:hidden">
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                >
                  {showPassword ? <PiEyeSlashThin /> : <PiEyeThin />}
                </button>
              </div>
              <div className="absolute top-1 left-0 text-gray-400">
                <IoLockClosedOutline />
              </div>
              {errors.cPassword && touched.cPassword && (
                <small className="text-red-500">{errors.cPassword}</small>
              )}
            </div>
            <div className="py-5 text-center">
              <button
                type="submit"
                className="bg-black/20 uppercase p-2 text-sm max-w-sm rounded-md sm:text-base sm:p-3 md:p-2 lg:w-32 hover:bg-black/30 hover:text-gray-300"
              >
                signup
              </button>
            </div>
            <div className="text-center text-sm pb-5">
              <p>
                You have already an account?{" "}
                <Link to="/login">
                  <span className="text-gray-400">Login</span>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
