import mongoose from "mongoose";
import "dotenv/config";

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    const MONGODB_URI = process.env.MONGODBURI;

    if (!MONGODB_URI) {
      throw new Error("❌ MONGODBURI is not defined in environment variables");
    }

    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    });

    console.log("✅ MongoDB connected...");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
};










// import mongoose from "mongoose";
// import "dotenv/config";



// export const connectDB= async ()=>{
//     try {
//         const MONGODB_URI = process.env.MONGODBURI;

// await mongoose
//   .connect(MONGODB_URI)
//   .then((res) => {
//     console.log("mongodb connected...");
//   })
//   .catch((err) => {
//     console.log(err);
//   });
//     } catch (error) {
//         console.log(error);
        
//     }
// }


