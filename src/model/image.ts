import mongoose from 'mongoose';
import constantModels from './constantModels';

const { Schema } = mongoose;

const image = new Schema({
  phoneNumber: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

image.set('toJSON', {
  virtuals: true,
});

export default mongoose.model(constantModels.IMAGE, image);
