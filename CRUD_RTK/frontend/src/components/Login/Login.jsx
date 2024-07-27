import React, { useState } from "react";
import bg_image from "../../assets/login_bg.jpg";
import { PiEyeThin, PiEyeSlashThin } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { loginValidation } from "../../validation/loginValidation.js";
import { useLoginMutation } from "../../features/users/usersApiSlice";

const initialValue = {
  email: "",
  password: "",
};

const Login = () => {
  const [userLogin, {isLoading, error}] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()

  const { values, handleBlur, handleChange, handleSubmit, touched, errors } =
    useFormik({
      initialValues: initialValue,
      validationSchema: loginValidation,
      onSubmit: (values) => {
        console.log(values);
        userLogin(values).unwrap()
        .then((response) =>{
          window.alert(response.message)
          if(response.message === "success"){
            navigate("/")
          }
        }).catch((error) =>{
          console.log(error);
        })
      },
    });



  return (
    <div className="flex justify-center items-center h-screen bg-gray-300">
      <div className="flex flex-row bg-white w-1/2">
        <div className="w-1/2 relative">
          <div className="relative h-full">
            <img src={bg_image} alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 flex flex-col justify-center items-center">
              <p className="text-white text-sm">Nice to see you again</p>
              <h1 className="uppercase text-white text-3xl">Welcome back</h1>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center bg-white w-1/2 p-5">
          <div className="w-full">
            <div className="text-center py-5">
              <h2 className="text-blue-500 font-semibold text-2xl">
                Login Account
              </h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="py-5">
                <input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="email"
                  name="email"
                  value={values.email}
                  placeholder="Email"
                  className="p-1 px-5 w-full rounded-full bg-gray-200"
                />
                {errors.email && touched.email && (<small className="text-red-500">{errors.email}</small>)}
              </div>
              <div className="py-5 relative">
                <input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={values.password}
                  placeholder="Password"
                  className="p-1 px-5 w-full rounded-full bg-gray-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-7"
                >
                  {showPassword ? <PiEyeSlashThin /> : <PiEyeThin />}
                </button>
                {errors.password && touched.password && (<small className="text-red-500">{errors.password}</small>)}
              </div>
              <div className="py-5 text-center">
                <button
                  type="submit"
                  className="bg-blue-500 w-full p-1 rounded-full text-white hover:bg-blue-400"
                >
                  Login
                </button>
                <p className="text-sm text-gray-400">
                  Don't have an account?{" "}
                  <span className="text-blue-500">
                    <Link to="/signup">Sign in</Link>{" "}
                  </span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
