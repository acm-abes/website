import mongoose from "mongoose";

const MONGO_URI = process.env.MONGODB_URI || "your-mongodb-connection-string";

let isConnected = false; 

export async function connectToDB() {
  if (isConnected) {
    return;
  }

  try {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
    };

    await mongoose.connect(MONGO_URI, options);
    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Failed to connect to MongoDB");
  }
}
