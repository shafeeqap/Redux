import express from "express";
import profileController from "../controllers/profileController.js";
import multer from "multer";
const router = express.Router();


// ---------------------------------------------- //
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, "profileImage-" + Date.now() + ".jpg");
  },
});

const upload = multer({ storage: storage });

// ---------------------------------------------- //



router.get('/:id', profileController.getProfile);
router.post('/:id', upload.single('profileImage'), profileController.updateProfile);

export default router;


