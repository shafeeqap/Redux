import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRouter from './routes/userRoutes.js';

dotenv.config()
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use('api/users', userRouter);


const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Server is running:http://localhost:${PORT}`);
})