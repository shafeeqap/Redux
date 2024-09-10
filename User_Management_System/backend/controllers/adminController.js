import asyncHandler from "express-async-handler";
import User from "../models/users.js";
import generateToken from "../utils/generateToken.js";

// @desc     Auth Admin/set token
// route     POST /api/admin/login
// @access   Public
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(password);
  

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "User not exist!" });
  }

  if (user && (await user.matchPasswords(password))) {
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized as an admin" });
    }
    generateToken(res, user._id);
    
  res.status(201).json({
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    mobile: user.mobile,
    googleId: user.googleId,
    profileImage: user.profileImage,
    role: user.role,
  });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

// @desc     Logout admin
// route     POST /api/admin/logout
// @access   Public
const logoutAdmin = asyncHandler(async (req, res) => {
  
  res.cookie("jwt", "", {
    expires: new Date(0),
  });
  res.status(200).json({ message: "Admin logged out" });
});

// @desc     Users Data
// route     GET /api/admin/users
// @access   Private
const getUsers = asyncHandler(async (req, res) => {
  const user = await User.find({});

  res.status(200).json({ message: "User Data", user });
});

// @desc     Delete user
// route     DELETE /api/admin/users/:id
// @access   Private
const deleteUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const user = await User.findByIdAndDelete(userId);

  if (user) {
    res.status(200).json({ message: "User removed" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// @desc     Block and Unblock user
// route     PATCH /api/admin/users/block-unblock
// @access   Private
const blockUnblockUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  const user = await User.findOne({ _id: userId });

  if (user) {
    user.isStatus = !user.isStatus;
    await user.save();

    res.status(200).json({
      message: user.isStatus ? "User is unblocked" : "User is blocked",
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// @desc    Update user
// route     PUT /api/admin/users/update-user
// @access   Private
const updateUser = asyncHandler(async(req, res) =>{
  const userId = req.params.id;

  const user = await User.findOne({ _id: userId });

});

export { loginAdmin, logoutAdmin, getUsers, deleteUser, blockUnblockUser };
