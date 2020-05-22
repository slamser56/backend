import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const database = async (): Promise<void> => {
  try {
    mongoose.set(process.env.DEBUG, true);
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    Promise.resolve();
  } catch (error) {
    Promise.reject(error);
  }
};

export default database;
