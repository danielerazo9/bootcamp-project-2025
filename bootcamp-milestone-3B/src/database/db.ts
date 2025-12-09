import mongoose from "mongoose";

const url: string = process.env.MONGODB_URI as string;
let connection: typeof mongoose;

/**
 * Makes a connection to a MongoDB database...
 */
const connectDB = async () => {
  if (!connection) {
    console.log("MONGO_URI in 3B app:", url);
    connection = await mongoose.connect(url);
  }
  return connection;
};

export default connectDB;
