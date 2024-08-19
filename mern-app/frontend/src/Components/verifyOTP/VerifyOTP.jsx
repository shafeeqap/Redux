import { useState } from "react";
import OTPInput, { ResentOTP } from "otp-input-react";
import { useVerifyOTPMutation } from "../../features/user/usersApiSlice";
import Loader from "../Loader/Loader";
import "./VerifyOTP.css"



const VerifyOTP = ({email}) => {
  const [OTP, setOTP] = useState("");
  const [VerifyOTP, { isLoading }] = useVerifyOTPMutation()

  const handleSubmitOTP = async(e) =>{
    e.preventDefault();
    try {
        const res = await VerifyOTP({email, otp:OTP}).unwrap();
        console.log(res, 'verify otp response');
        
    } catch (error) {
        console.log(error);
        
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmitOTP}>
        <div className="mb-5 bg-blac flex flex-col justify-center items-center">
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
        <div className="py-5 text-center">
          <button
            type="submit"
            className="bg-blue-500 uppercase p-2 text-sm max-w-sm rounded-md sm:text-base sm:p-3 md:p-2 lg:w-full hover:bg-blue-600 hover:text-gray-200"
          >
            {isLoading ? <Loader /> : "Verify OTP"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VerifyOTP;
