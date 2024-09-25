import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/users.js";

const protectUser = asyncHandler(async (req, res, next) => {
  
    let token = req.cookies.jwt_user;

    if (token) {
      try {
        const decodded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decodded.userId).select("-password");

        if (!req.user) {
          return res.status(404).json({ message: 'User not found' });
        }

        if(req.user.role !== 'user'){
          return res.status(403).json({ message: 'Access denied; not a user'});
        }

        if(req.user.isStatus === false){
          return res.status(403).json({ message: 'User is blocked' });
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
