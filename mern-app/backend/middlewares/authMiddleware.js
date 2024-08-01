import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/users.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decodded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decodded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, invalid token");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export { protect };
