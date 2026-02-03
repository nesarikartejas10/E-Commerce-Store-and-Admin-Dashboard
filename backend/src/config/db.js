import mongoose from "mongoose";
import { config } from "./envConfig.js";

const connectDB = async () => {
  try {
    const dbConnect = await mongoose.connect(config.mongoURI);
    console.log(`MongoDB connected: ${dbConnect.connection.host}`);
  } catch (error) {
    console.log("Failed to connect MongoDB", error.message);
    process.exit(1);
  }
};

export default connectDB;
