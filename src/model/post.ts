import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const post = new Schema({
  idUser: {
    type: Number,
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

export default mongoose.model('post', post);
