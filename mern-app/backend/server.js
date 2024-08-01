import express from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/userRoutes.js';
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';
import { connenctDB } from './config/db.js';
import cookieParser from 'cookie-parser';

dotenv.config();
connenctDB();
const PORT = process.env.PORT || 5000


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use("/api/users", userRouter);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () =>{
    console.log(`Server is running:http://localhost:${PORT}`);
});

// - **POST /api/users** - Register a user
// - **POST /api/users/auth** - Authentication a user and get token
// - **POST /api/users/logout** - Logout user and clear cookie
// - **GET /api/users/profile** - Get user profile
// - **PUT /api/users/profile** - Update porfile 