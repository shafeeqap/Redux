import crypto from "crypto";


// Generate OTP (6-digit number)
// const generateOTP = Math.floor(100000 + Math.random() * 900000).toString();
// console.log(generateOTP, 'otp');

// Generate OTP (6-digit number)
// const generateOTP = randomstring.generate({
//   length: 6,
//   charset: "numeric",
// });
const generateOTP = async (user) => {
  const otp = crypto.randomInt(100000, 1000000).toString();
  user.otp = otp;
  user.otpExpire = Date.now() + 300000; // OTP valid for 5 minutes
  await user.save();
  return otp;
};

export { generateOTP };
