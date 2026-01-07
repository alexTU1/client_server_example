import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
        console.log("Connected to mongoDB!")
    } catch (error) {
        console.error("Connection Error: ", error.message);
        process.exit(1);
    }
}

module.exports = connectDB;