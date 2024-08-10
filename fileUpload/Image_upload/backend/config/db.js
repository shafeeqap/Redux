import mongoose from 'mongoose';

const connectDB = async() =>{
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Database connected: ${connect.connection.host}`);
    } catch (error) {
        console.log(`MongoDB connection error: ${error}`);
    }
}

export default connectDB;