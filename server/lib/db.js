import mongoose from "mongoose";

// Function to connect to the MongoDB database
export const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/chat-app`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};
