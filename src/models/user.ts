import mongoose, { Schema } from 'mongoose';
import constantModels from './constantModels';

export interface UserInterface extends mongoose.Document {
  avatar: string;
  phoneNumber: number;
  password: string;
  isDeleted: boolean;
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;
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
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
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
