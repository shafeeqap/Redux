import User from "../models/User.js";

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, phone } = req.body;
    const profileImage = req.file ? req.file.path : undefined;

    const user = await User.findById(req.params.id);
    if (user) {
      user.name = name || user.name;
      user.phone = phone || user.phone;
      if (profileImage) {
        user.profileImage = profileImage;
      }

      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export default { getProfile, updateProfile };
