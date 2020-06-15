import mongoose, { Schema } from 'mongoose';
import constantModels from './constantModels';

export interface UserInterface extends mongoose.Document {
  avatar: string;
  phoneNumber: number;
  password: string;
  deleted: boolean;
}

const user = new Schema(
  {
    phoneNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

user.set('toJSON', {
  virtuals: true,
});

export default mongoose.model<UserInterface>(constantModels.USER, user);
