import mongoose, { Schema } from 'mongoose';
import constantModels from './constantModels';

export interface SubscriptionInterface extends mongoose.Document {
  user: string | {};
  subscriber: string;
  isDeleted: boolean;
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserInterface extends SubscriptionInterface {
  user: {
    _id: string;
    isDeleted: boolean;
    phoneNumber: number;
    createdAt: Date;
    updatedAt: Date;
  };
}

const subscription = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    subscriber: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
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

subscription.set('toJSON', {
  virtuals: true,
});

export default mongoose.model<SubscriptionInterface>(constantModels.SUBSCRIPTION, subscription);
