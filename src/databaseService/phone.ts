import model from '../models';
import { PhoneVerificationInterface } from '../models/phoneVerification';

export const setCode = async (phoneNumber: number, code: number): Promise<void> => {
  try {
    await model.phoneVerification.updateOne({ phoneNumber }, { phoneNumber, code }, { upsert: true });
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};

export const findCode = async (phoneNumber: number, code: number): Promise<void | PhoneVerificationInterface> => {
  try {
    const find = await model.phoneVerification.findOne({
      phoneNumber,
      code,
    });
    return find;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteCode = async (phoneNumber: number, code: number): Promise<void> => {
  try {
    await model.phoneVerification.deleteOne({ phoneNumber, code });
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};
