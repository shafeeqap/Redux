import mongoose from "mongoose";


export const connenctDB = async() =>{
    try {
        const connect = await mongoose.connect(process.env.MONGOOSE_URI);
        console.log(`Database is connected: ${connect.connection.host}`);
    } catch (error) {
        console.log(`MongoDB error: ${error.message}`);
        process.exit(1);
    }
}
