import mongoose, { Schema } from 'mongoose';
import constantModels from './constantModels';

export interface PostInterface extends mongoose.Document{
  _id: string;
  idUser: string;
  text: string;
  date: Date;
  images: Array<string>;
}

const post = new Schema({
  idUser: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

post.set('toJSON', {
  virtuals: true,
});

export default mongoose.model<PostInterface>(constantModels.POST, post);
