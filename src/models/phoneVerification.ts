import mongoose, { Schema } from 'mongoose';
import constantModels from './constantModels';


export interface PhoneVerificationInterface extends mongoose.Document{
  _id: string;
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

export default mongoose.model<PhoneVerificationInterface>(constantModels.PHONE_VERIFICATION, phoneVerification);
