import mongoose, { Schema } from 'mongoose';

interface UserInterface extends mongoose.Document{
  _id: Schema.Types.ObjectId;
  avatar: string;
  phoneNumber: number;
}

const user = new Schema({
  phoneNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  avatar: {
    type: String,
  },
});

user.set('toJSON', {
  virtuals: true,
});

export default mongoose.model<UserInterface>('user', user);
