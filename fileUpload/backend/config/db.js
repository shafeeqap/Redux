import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connect = await mongoose.connect("mongodb://127.0.0.1:27017/fileUpload");
    console.log(`Database connected:${connect.connection.host}`);
  } catch (error) {
    console.log(`MongoDB error:${error}`);
    process.exit(1);
  }
};

export default connectDB;
