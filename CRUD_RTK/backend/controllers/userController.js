import { User } from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// GET : Handle get user
const handleGetUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST : Handle Signup
const handleSignup = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.json({ message: "User already exist" });
    } else {
      const newUser = await User.create({
        userName,
        email,
        password: hashedPassword,
      });
      return res.status(200).json({ message: "success", newUser });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// POST : Handle login
const handleLogin = async (req, res) =>{
  try {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(user){
      const matched = await bcrypt.compare(password, user.password);
      if(matched){
        const token = jwt.sign({email:user.email}, "jwt-secret-key", {expiresIn:"1d"});
        res.cookie("token", token, { httpOnly: true, sameSite: 'strict' });
        return res.status(200).json({message: "success", user})
      }else{
        return res.status(401).json({ message: "Password does not match" });
      }
    }else{
      return res.status(404).json({ message: "User does not exist" });
    }
  } catch (error) {
    res.status(500).json({message})
  }
}

export { handleGetUsers, handleSignup, handleLogin };
