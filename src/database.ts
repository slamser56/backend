import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const database = async () => {
  try {
    mongoose.set('debug', true);
    await mongoose.connect(
      String(process.env.MONGO_URL),
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      function (err) {
        if (err) {
          Promise.reject()
        }
      },
    );
    Promise.resolve();
  } catch (error) {
    Promise.reject(error);
  }
};
