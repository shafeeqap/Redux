import React, { useEffect, useState } from "react";
import { PiEyeThin, PiEyeSlashThin } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { loginValidation } from "../../../validation/yupLoginValidation.js";
import { IoLockClosedOutline } from "react-icons/io5";
import { TfiEmail } from "react-icons/tfi";
import { useLoginMutation } from "../../../features/user/usersApiSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../../features/user/authSlice.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../../../Components/Loader/Loader.jsx";

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
      initialValues: initialValues,
      validationSchema: loginValidation,
      onSubmit: async (values) =>{
        try {
          const res = await toast.promise(
            login(values).unwrap(),
            {
              pending: "Logging in...",
              success: "Logged in successfully!",
              error: "Login failed!",
            }
          );
          console.log(res);
          dispatch(setCredentials({...res}))
          navigate("/")
        } catch (error) {
          console.log(error?.data?.message || error.error);
          toast.error(error?.data?.message || "An error occurred during login.");
        }
      }
    });

  return (
    <div className="flex justify-center items-center h-screen bg-black/65 text-white">
      <div className="bg-black/10 w-1/4 rounded-3xl">
        <div className="bg-black/20 text-center p-5 rounded-t-3xl">
          <h2 className="uppercase">user login</h2>
        </div>
        <div className="p-5">
          <form onSubmit={handleSubmit}>
            <div className="mb-5 relative">
              <input
                onChange={handleChange}
                onBlur={handleBlur}
                name="email"
                type="email"
                value={values.email}
                placeholder="Email ID"
                className="border-b-2 bg-transparent w-full pl-5 pb-3 outline-none"
              />
              <div className="absolute top-1 left-0 text-gray-400">
                <TfiEmail />
              </div>
              { errors.email && touched.email && (<small className="text-red-500">{errors.email}</small>)}
            </div>
            <div className="mb-3 relative">
              <input
                onChange={handleChange}
                onBlur={handleBlur}
                type={showPassword ? "text" : "password"}
                name="password"
                value={values.password}
                placeholder="Password"
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
              { errors.password && touched.password && (<small className="text-red-500">{errors.password}</small>)}
            </div>
            <div className="py-5 text-center">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-black/20 uppercase p-2 text-sm max-w-sm rounded-md sm:text-base sm:p-3 md:p-2 lg:w-32 hover:bg-black/30 hover:text-gray-300"
                >
                {isLoading ? <Loader /> : "Login"} 
              </button>
            </div>
            <div className="text-center text-sm">
              <p>
                You don't have account?{" "}
                <Link to="/signup">
                  <span className="text-gray-400">Sign up</span>
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

export default Login;
