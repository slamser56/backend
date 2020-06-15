import mongoose, { Schema } from 'mongoose';
import constantModels from './constantModels';

export interface PostTextInterface extends mongoose.Document {
  text: string;
}

const postText = new Schema({
  text: {
    type: String,
    required: true,
  },
});

postText.set('toJSON', {
  virtuals: true,
});

export default mongoose.model<PostTextInterface>(constantModels.POST_TEXT, postText);
