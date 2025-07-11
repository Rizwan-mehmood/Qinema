import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
    if (isConnected) return;

    try {
        mongoose.connection.on('connected', () => console.log("Database Connected"));
        mongoose.connect(`${process.env.MONGODB_URI}`);
        isConnected = true;
    } catch (error) {
        console.error(error);
    }
}

export default connectDB;