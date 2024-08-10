import express from 'express';
import { upload } from '../middleware/fileUploadMiddleware.js';
import fileController from '../controllers/fileController.js';
import { handleUploadErrors } from '../middleware/handleUploadErrors.js'

const fileRoutes = express.Router();

fileRoutes.post("/uploadFile", upload.single('file'), handleUploadErrors, fileController.uploadFile);
fileRoutes.get("/getFile/:id", fileController.getFile);

export default fileRoutes;