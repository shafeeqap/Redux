import { File } from "../models/files.js";
import { createFile } from "../services/createFile.js";


export default {
  uploadFile: async (req, res) => {
    try {
      const uploadedFile = await createFile({
        filename: req.file.filename,
        filepath: req.file.path,
      });
      
      res.status(201).json({ message: "File uploaded successfully", uploadedFile });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ message: "Server error", error });
    }
  },
  getFile: async (req, res) => {
    try {
      const file = await File.findById(req.params.id);
  
      if (!file) {
        return res.status(404).json({ message: "File not found" });
      }
      
      res.status(200).json({ message: "File-fetch is successful.", file});
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
      console.error("Get file error:", error);
    }
  },
};
