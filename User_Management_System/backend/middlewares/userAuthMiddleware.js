import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/users.js";

const protectUser = asyncHandler(async (req, res, next) => {
  
    let token = req.cookies.jwt_user;

    if (token) {
      try {
        const decodded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decodded.userId).select("-password");

        if(req.user.role !== 'user'){
          return res.status(403).json({ message: 'Access denied; not a user'});
        }

        next();
      } catch (error) {
        console.error("Authentication error:", error);
        res.status(401);
        throw new Error("Not authorized, invalid token");
      }
    } else {
      console.error("Token not provided");
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  });

export { protectUser };
