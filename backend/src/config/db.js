import mongoose from "mongoose";
import { config } from "./envConfig.js";

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoURI);
    console.log("Connect to db successfully");
  } catch (error) {
    console.log("Failed to connect db", error);
    process.exit(1);
  }
};

export default connectDB;
