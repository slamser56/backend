import mongoose, { Schema } from 'mongoose';
import constantModels from './constantModels';

export interface PostInterface extends mongoose.Document {
  author: string | {};
  content: string | {};
  isDeleted: boolean;
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthorInterface extends PostInterface {
  author: {
    isDeleted: boolean;
    phoneNumber: number;
    createdAt: Date;
    updatedAt: Date;
  };
}
export interface ContentInterface extends PostInterface {
  content: {
    text: string;
  };
}

const post = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    content: {
      type: Schema.Types.ObjectId,
      ref: 'postContent',
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

post.set('toJSON', {
  virtuals: true,
});

export default mongoose.model<PostInterface>(constantModels.POST, post);
