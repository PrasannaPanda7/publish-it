import mongoose from "mongoose";

const DB_URI = process.env.MONGODB_URI;

export const ConnectDB = async () => {
  try {
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB connected");
  } catch (error) {
    console.error("DB connection error:", error);
    process.exit(1); // Exit the process with failure
  }
};
