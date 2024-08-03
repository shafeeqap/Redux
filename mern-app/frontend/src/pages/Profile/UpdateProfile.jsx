import React, { useState, useEffect } from "react";
import { PiEyeThin, PiEyeSlashThin } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { updateProfileValidation } from "../../validation/updateProfileValidation.js";
import { IoLockClosedOutline } from "react-icons/io5";
import { TfiEmail } from "react-icons/tfi";
import { FiUser } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUpdateUserMutation } from "../../features/user/usersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../features/user/authSlice.js";
import Loader from "../../Components/Loader/Loader.jsx";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  cPassword: "",
};

const UpdateProfile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setFirstName(userInfo.firstName);
    setEmail(userInfo.email);
  }, [userInfo.firstName, userInfo.email]);

  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: updateProfileValidation,
      onSubmit: async (values) => {
        try {
          const res = await toast.promise(updateUser(values).unwrap(), {
            pending: "Updating...",
            success: "Updation successful!",
            error: "Updation failed!",
          });
          console.log(res);
          // update the Redux store with the new user credentials.
          dispatch(setCredentials({ ...res }));
          //   navigate("/login");
        } catch (error) {
          toast.error(
            error?.data?.message || "An error occurred during register."
          );
        }
      },
    });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 relative">
          <input
            onChange={handleChange}
            onBlur={handleBlur}
            name="firstName"
            value={values.firstName}
            type="text"
            placeholder="First Name"
            className="border-b-2 bg-transparent w-full pl-5 pb-3 outline-none"
          />
          <div className="absolute top-1 left-0 text-gray-400">
            <FiUser />
          </div>
          {errors.firstName && touched.firstName && (
            <small className="text-red-500">{errors.firstName}</small>
          )}
        </div>
        <div className="mb-3 relative">
          <input
            onChange={handleChange}
            onBlur={handleBlur}
            name="lastName"
            value={values.lastName}
            type="text"
            placeholder="Last Name"
            className="border-b-2 bg-transparent w-full pl-5 pb-3 outline-none"
          />
          <div className="absolute top-1 left-0 text-gray-400">
            <FiUser />
          </div>
          {errors.lastName && touched.lastName && (
            <small className="text-red-500">{errors.lastName}</small>
          )}
        </div>
        <div className="mb-3 relative">
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
        <div className="mb-3 relative">
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
        {/* <div className="py-5 text-center">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-black/20 uppercase p-2 text-sm max-w-sm rounded-md sm:text-base sm:p-3 md:p-2 lg:w-32 hover:bg-black/30 hover:text-gray-300"
          >
            {isLoading ? <Loader /> : ""}
          </button>
        </div> */}
      </form>
    </div>
  );
};

export default UpdateProfile;
