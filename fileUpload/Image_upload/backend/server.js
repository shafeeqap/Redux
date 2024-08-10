import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import fileRoutes from './routes/fileRoute.js'

dotenv.config();
connectDB();
const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/', (req, res) =>{
    res.send("Hello Word")
})

app.use('/api/file',fileRoutes)

app.listen(PORT, ()=>{
    console.log(`Server running:http://localhost:${PORT}`);
})