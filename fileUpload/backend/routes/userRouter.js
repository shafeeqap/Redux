import express from 'express';
import {uploadFile, getFiles} from '../controllers/userController.js'
import { upload } from '../middlewares/uploadMiddleware.js';

const userRoute = express.Router();

userRoute.post('/upload', upload.single('file'), uploadFile);
userRoute.get('/images/:id', getFiles)

export default userRoute;