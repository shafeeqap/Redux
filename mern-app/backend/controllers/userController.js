import asyncHandler from "express-async-handler";
import User from "../models/users.js";
import generateToken from "../utils/generateToken.js";

// @desc     Auth User/set token
// route     POST /api/users/auth
// @access   Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPasswords(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobile: user.mobile,
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

// @desc     Register a new user
// route     POST /api/users/
// @access   Public
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(400);
    throw new Error("User already exist");
  }
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
  });
  if (user) {
    generateToken(res, user._id);
    return res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
  res.status(200).json({ message: "Register  User", user: req.body });
});

// @desc     Logout user
// route     POST /api/users/logout
// @access   Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    expires: new Date(0),
  });
  res.status(200).json({ message: "User logged out" });
});

// @desc     Get user profile
// route     GET /api/users/profile
// @access   Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    email: req.user.email,
    mobile: req.user.mobile,
  };
  res.status(200).json({ message: "User profile", user });
});

// @desc     Update user profile
// route     PUT /api/users/profile
// @access   Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.mobile = req.body.mobile || user.mobile;

    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      mobile: updatedUser.mobile,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc     Update user password
// route     PUT /api/users/updatePassword
// @access   Private
const updatePassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isMatch = await user.matchPasswords(req.body.currentPassword);

  if (!isMatch) {
    res.status(400).json({ message: "Current password is incorrect" });
  }

  user.password = req.body.newPassword;
  await user.save();

  return res.status(200).json({ message: "Password updated successfully" });
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  updatePassword,
};
