import { Image } from "../models/images.js";
import fs from "fs";

// POST /api/users/upload
const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Please select an image to upload" });
    }

    const newImage = new Image({
      name: req.file.filename,
      contentType: req.file.mimetype,
      data: fs.readFileSync(req.file.path),
    });

    const savedImage = await newImage.save();

    res.status(200).json({ message: "Image uploaded successfully", id: savedImage._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET /api/users/images/:id
const getFiles = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);

    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }
    const imageData = image.data.toString('base64');
    
    res.json({ message: 'Image fetched successfully', data: imageData, contentType: image.contentType });

  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export { uploadFile, getFiles };
