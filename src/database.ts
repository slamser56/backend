import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const database = async (): Promise<void> => {
  mongoose.set(process.env.DEBUG, true);
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
};

export default database;
