import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);

    console.log("Connected to MongoDB");

    // Handle connection errors
    mongoose.connection.on("error", (err) => {
      console.error("MongoDB Connection Error:", err);
    });

    // Auto-reconnect if MongoDB disconnects
    mongoose.connection.on("disconnected", () => {
      console.warn(" MongoDB Disconnected! Retrying...");
      dbConnect(); // Reconnect automatically
    });

  } catch (error) {
    console.error("MongoDB Connection Failed:", error);
    process.exit(1); // Exit process if DB connection fails
  }
};
