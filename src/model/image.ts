import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const image = new Schema({
  phoneNumber: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  }
});

image.set('toJSON', {
  virtuals: true,
});

export default mongoose.model('image', image);