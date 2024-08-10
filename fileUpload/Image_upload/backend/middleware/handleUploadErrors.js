import multer from "multer";

// Middleware to handle upload errors
const handleUploadErrors = (err, req, res, next) => {
  if (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: `Multer error: ${err.message}` });
    } else {
      return res.status(400).json({ message: `Upload error: ${err.message}` });
    }
  }
  next();
};

export { handleUploadErrors };
