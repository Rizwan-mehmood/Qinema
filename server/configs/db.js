import mongoose from "mongoose";


const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => console.log("Database Connected"));
        mongoose.connect(`${process.env.MONGODB_URI}`);
    } catch (error) {
        console.error(error);
    }
}

export default connectDB;