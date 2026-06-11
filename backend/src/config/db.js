import mongoose from "mongoose";
import { config } from "./config.js";

const connectDB = async () => {

    try {
        await mongoose.connect(config.MONGO_URI);
        console.log("Connected to MongoDB");
        return true;
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        return false;
    }
};

export default connectDB;