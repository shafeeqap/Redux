import * as Yup from "yup";

// .matches(/^(?!(\d)\1{9})[5-9]\d{9}$/, "Invalid mobile number")

export const signupValidation = Yup.object({
  userName: Yup.string()
    .min(3)
    .matches(/^[^\s]+(\s[^\s]+)*$/, "Name cannot have adjacent spaces")
    .required("Please enter your name"),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      "Please enter valid email"
    )
    // .email("Please enter valid email")
    .required("Please enter your email"),
  password: Yup.string()
    .matches(/^[^\s]+$/, "Password cannot contain spaces")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    )
    .min(5)
    .required("Please enter your password"),
  cPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password not matched")
    .required("Please enter confirm password"),
});
