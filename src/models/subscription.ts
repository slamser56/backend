import mongoose, { Schema } from 'mongoose';
import constantModels from './constantModels';

export interface SubscriptionInterface extends mongoose.Document {
  userId: string;
  userIdSubscription: string;
  deleted: boolean;
}

const post = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    userIdSubscription: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
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

post.set('toJSON', {
  virtuals: true,
});

export default mongoose.model<SubscriptionInterface>(constantModels.SUBSCRIPTION, post);
