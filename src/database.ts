import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const database = async (): Promise<void> => {
  try {
    mongoose.set('debug', true);
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    Promise.resolve();
  } catch (error) {
    Promise.reject(error);
  }
};

export default database;
