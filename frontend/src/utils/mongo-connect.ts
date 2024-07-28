import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { ConnectOptions } from 'mongoose';

dotenv.config();

export const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI as string;
    if (!mongoURI) {
      throw new Error('MONGODB_URI is not defined in the environment variables');
    }
    console.log('Connecting to MongoDB with URI:', mongoURI);
    await mongoose.connect(mongoURI, {
 
      serverSelectionTimeoutMS: 5000,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    console.error('Check your MongoDB URI and ensure your IP address is whitelisted in MongoDB Atlas');
    throw error;
  }
};
