import { useEffect, useState } from "react";
import OTPInput from "otp-input-react";
import {
  useVerifyOTPMutation,
  useResendOtpMutation,
} from "../../features/user/usersApiSlice";
import {
  openResetPasswordModal,
  closeResetPasswordModal,
} from "../../features/modal/modalSlice";
import Loader from "../Loader/Loader";
import "./VerifyOTP.css";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../modal/Modal";
import ResetPassword from "../ForgotPassword/ResetPassword";

const VerifyOTP = ({ email, otpExpire  }) => {
  const [OTP, setOTP] = useState("");
  const [timer, setTimer] = useState(
    Math.floor((otpExpire - Date.now()) / 1000)
  );
  const [VerifyOTP, { isLoading: isVerifying }] = useVerifyOTPMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();
  const { isResetPasswordModalOpen } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(countdown);
    }
  }, [timer]);

  const handleResetPasswordModalClose = () => {
    dispatch(closeResetPasswordModal());
  };

  const handleSubmitOTP = async (e) => {
    e.preventDefault();
    try {
      const res = await VerifyOTP({ email, otp: OTP }).unwrap();
      console.log(res, "verify otp response");

      if (res.message === "verified") {
        dispatch(openResetPasswordModal());
      } else {
        setTimer(0);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleResendOTP = async () => {
    try {
      const res = await resendOtp({ email, otp: OTP }).unwrap();
      console.log(res, "resent opt");

      if (res.otpExpire) {
        setTimer(Math.floor((res.otpExpire - Date.now()) / 1000));
        setOTP("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmitOTP}>
        <div className="bg-blac flex flex-col justify-center items-center">
          <div className="">
            <p className="text-black">Enter your OTP</p>
          </div>
          <OTPInput
            value={OTP}
            onChange={setOTP}
            otpType="number"
            autoFocus
            OTPLength={6}
            disabled={false}
            // secure
            className="otp-container"
            inputClassName="otp-input"
          />
        </div>
        <div className="py- text-center">
          {timer === 0 && (
            <div className="py-5">
              <button
                onClick={handleResendOTP}
                type="button"
                className=" text-sm max-w-sm rounded-md sm:text-base sm:p-3 md:p-2 lg:w-full text-blue-500"
              >
                {isVerifying ? <Loader /> : "Resent OTP"}
              </button>
            </div>
          )}
          <button
            type="submit" 
            disabled={timer === 0 || OTP.length !== 6}
            className="mb-5 bg-blue-500 uppercase p-2 text-sm max-w-sm rounded-md sm:text-base sm:p-3 md:p-2 lg:w-full hover:bg-blue-600 hover:text-gray-200"
          >
            {isResending ? <Loader /> : "Verify OTP"}
          </button>

          {timer > 0 && (
            <div className="text-center text-black">
              Resend OTP in <span className="text-red-500">{timer}</span>{" "}
              seconds
            </div>
          )}
        </div>
      </form>
      <Modal
        isOpen={isResetPasswordModalOpen}
        onClose={handleResetPasswordModalClose}
        title={"Reset Password"}
      >
        <ResetPassword email={email}/>
      </Modal>
    </div>
  );
};

export default VerifyOTP;
