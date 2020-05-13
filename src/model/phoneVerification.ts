import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const phoneVerification = new Schema({
  phoneNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  code: {
    type: Number,
    required: true,
  },
});

phoneVerification.set('toJSON', {
  virtuals: true,
});

export default mongoose.model('phoneVerification', phoneVerification);
