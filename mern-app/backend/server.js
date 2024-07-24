import express from "express";
import connectDB from "./config/db.js";
import dotenv from 'dotenv';
import profileRouter from './routers/profileRouter.js';

dotenv.config();
connectDB();
const app = express();

// Middleware
app.use(express.json());
app.use('./uploads', express.static('uploads'));

// Routes
app.use('/api/profile', profileRouter);




const PORT = process.env.PORT || 8000;

app.listen(PORT, ()=>{
    console.log(`Server is running in port ${PORT}`);
})