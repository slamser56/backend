import mongoose, { Schema } from 'mongoose';
import constantModels from './constantModels';
import { PostTextInterface } from './postText';

export interface PostInterface extends mongoose.Document {
  userId: string;
  postTextId: string | PostTextInterface;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
}

const post = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    postTextId: {
      type: Schema.Types.ObjectId,
      ref: 'postText',
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

export default mongoose.model<PostInterface>(constantModels.POST, post);
