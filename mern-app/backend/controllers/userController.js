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
    profileImage: req.user.profileImage,
    // profileImage: req.user.profileImage.toString("base64"),
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

// @desc     Add profile image
// route     POST /api/users/profileImage
// @access   Private
const uploadProfileImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  if (!req.user) {
    return res.status(401).json({ message: "User not authenticated" });
  }
  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.profileImage = `${req.file.filename}`;
  const updatedUser = await user.save();

  res.status(200).json({
    _id: updatedUser._id,
    firstName: updatedUser.firstName,
    lastName: updatedUser.lastName,
    email: updatedUser.email,
    mobile: updatedUser.mobile,
    profileImage: updatedUser.profileImage,
    message: "Profile image added successfully",
  });
});

// @desc     Get profile image
// route     GET /api/users/profileImage
// @access   Private
const getProfileImage = asyncHandler(async (req, res) => {
  console.log(req.params.id, 'params.id');
  if (req.params.id) {
    const image = await User.findById(req.params.id);
console.log(image, 'image');
    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }
    const imageData = image.data.toString("base64");

    res.json({
      message: "Image fetched successfully",
      data: imageData,
      contentType: image.contentType,
    });
  } else {
    return res.status(404).json({ message: "User not found" });
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  updatePassword,
  uploadProfileImage,
  getProfileImage,
};
