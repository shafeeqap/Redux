import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PiEyeThin, PiEyeSlashThin } from "react-icons/pi";
import { useFormik } from "formik";
import { signupValidation } from "../../validation/signupValidation.js";
import { useRegisterMutation } from "../../features/users/usersApiSlice.js";

const initialValue = {
  userName: "",
  email: "",
  password: "",
  cPassword: "",
};

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [addUser, { isLoading, error }] = useRegisterMutation();
  const navigate = useNavigate();

  const { values, handleBlur, handleChange, handleSubmit, touched, errors } =
    useFormik({
      initialValues: initialValue,
      validationSchema: signupValidation,
      onSubmit: (values) => {
        console.log(values);
        addUser(values)
          .unwrap()
          .then((response) => {
            window.alert(response.message);
            if (response.message === "success") {
              navigate("/login");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      },
    });

  return (
    <div className="flex justify-center items-center bg-gray-300 h-screen">
      <div className="bg-white p-5 w-1/4">
        <div className="text-center py-5">
          <h1 className="text-blue-500 font-semibold text-2xl">Sign in</h1>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="py-3">
              <input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.userName}
                type="text"
                name="userName"
                placeholder="Name"
                className="p-1 px-5 w-full rounded-full bg-gray-200"
              />
              {touched.userName && errors.userName && (
                <small className="text-red-500">{errors.userName}</small>
              )}
            </div>
            <div className="py-3">
              <input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                type="email"
                name="email"
                placeholder="Email"
                className="p-1 px-5 w-full rounded-full bg-gray-200"
              />
              {touched.email && errors.email && (
                <small className="text-red-500">{errors.email}</small>
              )}
            </div>
            <div className="py-3">
              <input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                type="password"
                name="password"
                placeholder="Passwrod"
                className="p-1 px-5 w-full rounded-full bg-gray-200"
              />
              {touched.password && errors.password && (
                <small className="text-red-500">{errors.password}</small>
              )}
            </div>
            <div className="py-3 relative">
              <input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.cPassword}
                type={showPassword ? "text" : "password"}
                name="cPassword"
                placeholder="Confirm password"
                className="p-1 px-5 w-full rounded-full bg-gray-200"
              />
              <button
                type="button" // Prevent form submission
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-5"
              >
                {showPassword ? <PiEyeSlashThin /> : <PiEyeThin />}
              </button>
              {touched.cPassword && errors.cPassword && (
                <small className="text-red-500">{errors.cPassword}</small>
              )}
            </div>
            <div className="py-5 text-center">
              <button
                type="submit"
                className="bg-blue-500 w-full p-1 rounded-full text-white hover:bg-blue-400"
                disabled={isLoading}
              >
                {isLoading ? "Signing up..." : "Sign up"}
              </button>
              {error && (
                <p className="text-red-500 mt-2">{error.data.message}</p>
              )}
              <p className="text-sm text-gray-400">
                You have already account?{" "}
                <span className="text-blue-500">
                  <Link to="/login">Login</Link>{" "}
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
