import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// ------------------------ Check file type -------------------------- //
function checkFileType(file, cb) {
  // Define allowed MIME types
  const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept file
  } else {
    cb(new Error("Invalid file type. Only JPEG, PNG, and PDF files are allowed."), false );
  }
}

// Initialize upload
export const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1 MB limit
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});
