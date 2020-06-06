import model from '../models';
import { PhoneVerificationInterface } from '../models/phoneVerification';

export const createOrUpdateCode = async (phoneNumber: number, code: number): Promise<void> => {
  await model.phoneVerification.updateOne({ phoneNumber }, { phoneNumber, code }, { upsert: true });
};

export const findCode = async (phoneNumber: number, code: number): Promise<PhoneVerificationInterface> => {
  const find = await model.phoneVerification.findOne({
    phoneNumber,
    code,
  });
  return find;
};

export const deleteCode = async (phoneNumber: number, code: number): Promise<void> => {
  await model.phoneVerification.deleteOne({ phoneNumber, code });
};
