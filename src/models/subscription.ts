import mongoose, { Schema } from 'mongoose';
import constantModels from './constantModels';

export interface SubscriptionInterface extends mongoose.Document {
  _id: string;
  idUser: string;
  idUserSubscription: string | {}
}

export interface UserSubscriptionInterface extends SubscriptionInterface {
  idUserSubscription: {
    id: string;
    phoneNumber: number;
  }
}

const post = new Schema({
  idUser: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  idUserSubscription: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

post.set('toJSON', {
  virtuals: true,
});

export default mongoose.model<SubscriptionInterface>(constantModels.SUBSCRIPTION, post);
