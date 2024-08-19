import { useState } from "react";
import { IoLockClosedOutline } from "react-icons/io5";
import { PiEyeThin, PiEyeSlashThin } from "react-icons/pi";
import { useFormik } from "formik";
import { useResetPasswordMutation } from "../../features/user/usersApiSlice";
import { resetPasswordValidation } from "../../utils/validation/resetPasswordValidation.js";
import "./ResetPassword.css";

const ResetPassword = ({ email }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [OTP, setOTP] = useState("");
  const [resetPassword, { isLoading }] = useResetPasswordMutation();



  return (
    <div>
      <form >
        <div className="mb-3 relative">
          <input
            name="password"
            type="password"
            placeholder="Enter your new password"
            className="border-b-2 bg-transparent w-full pl-5 pb-3 outline-none"
          />
          <div className="absolute top-1 left-0 text-gray-400">
            <IoLockClosedOutline />
          </div>
          {/* {errors.password && touched.password && (
                <small className="text-red-500">{errors.password}</small>
              )} */}
        </div>
        <div className="mb-3 relative">
          <input
            name="cPassword"
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
          {/* {errors.cPassword && touched.cPassword && (
                <small className="text-red-500">{errors.cPassword}</small>
              )} */}
        </div>
        <div className="py-5 text-center">
          <button
            type="submit"
            className="bg-blue-500 uppercase p-2 text-sm max-w-sm rounded-md sm:text-base sm:p-3 md:p-2 lg:w-full hover:bg-blue-600 hover:text-gray-200"
          >
            {/* {isLoading ? "Updating..." : "Reset Password"} */}Update
            Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
