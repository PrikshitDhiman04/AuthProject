import mongoose from "mongoose";

export async function connect() {
try {
// Check if MongoDB is already connected
if (mongoose.connection.readyState === 1) {
console.log("MongoDB is already connected");
return;
}


    // Check environment variable
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
        throw new Error("MONGO_URI is missing from environment variables");
    }

    // Establish database connection
    await mongoose.connect(mongoURI);

    console.log("MongoDB Connected Successfully");

} catch (error) {
    console.log("MongoDB connection failed:", error);
    throw error;
}


}
