import express from 'express';
import { uploadProfileImage } from '../controllers/userController.js';
import {upload} from '../middleware/uploadMiddleware.js'


const router = express.Router();

router.post('/profile', uploadProfileImage);

export default router;
