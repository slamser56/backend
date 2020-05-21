import mongoose, { Schema } from 'mongoose';
import constantModels from './constantModels';

interface UserInterface extends mongoose.Document{
  _id: string;
  avatar: string;
  phoneNumber: number;
}

const user = new Schema({
  phoneNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  avatar: {
    type: String,
  },
});

user.set('toJSON', {
  virtuals: true,
});

export default mongoose.model<UserInterface>(constantModels.USER, user);
