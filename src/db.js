import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost/merndb");
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log(error);
    }
};