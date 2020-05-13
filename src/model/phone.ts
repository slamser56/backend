import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const phone = new Schema({
  phoneNumber: {
    type: Number,
    required: true,
    unique: true,
  },
});

phone.set('toJSON', {
  virtuals: true,
});

export default mongoose.model('phone', phone);
