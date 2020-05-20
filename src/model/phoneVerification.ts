import mongoose, { Schema } from 'mongoose';


export interface PhoneVerificationInterface extends mongoose.Document{
  _id: Schema.Types.ObjectId;
  code: number;
  phoneNumber: number;
}


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

export default mongoose.model<PhoneVerificationInterface>('phoneVerification', phoneVerification);
