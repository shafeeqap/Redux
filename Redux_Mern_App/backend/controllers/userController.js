import {User} from "../models/user.js";

const uploadProfileImage = async (req, res) => {
  try {

    console.log(req);

    const user = await User.findById(req.user._id)

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export { uploadProfileImage };
