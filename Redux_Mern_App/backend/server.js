import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js'

dotenv.config();
connectDB();


const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);
const PORT = process.env.PORT || 3000;


app.get('/', (req, res) =>{
    res.send('Hello world')
})

app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
})