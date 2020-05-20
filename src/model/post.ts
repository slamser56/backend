import mongoose, { Schema } from 'mongoose';

export interface PostInterface extends mongoose.Document{
  _id: Schema.Types.ObjectId;
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
  images: {
    type: Array,
  },
});

post.set('toJSON', {
  virtuals: true,
});

export default mongoose.model<PostInterface>('post', post);
