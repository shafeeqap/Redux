import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import userRoute from "./routes/userRouter.js";
import path from 'path';
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;
connectDB();

app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend origin
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/users", userRoute);

app.listen(PORT, () => {
  console.log(`Server is running:http://localhost:${PORT}`);
});
