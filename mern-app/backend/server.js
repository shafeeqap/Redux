import express from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/userRoutes.js';
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';
import { connenctDB } from './config/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();
connenctDB();
const PORT = process.env.PORT || 3000

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use('/userProfile', express.static('public/userProfile'));
app.use("/api/users", userRouter);
app.use(notFound);
app.use(errorHandler);


app.listen(PORT, () =>{
    console.log(`Server is running:http://localhost:${PORT}`);
});