import model from '../models';
import t from '../lang/index';
import { PhoneVerificationInterface } from '../models/phoneVerification';

export const createOrUpdateCode = async (phoneNumber: number, code: number): Promise<void> => {
  await model.phoneVerification.updateOne(
    { phoneNumber },
    { phoneNumber, code, createdAt: Date.now() },
    { upsert: true },
  );
};

export const findCode = async (phoneNumber: number, code: number): Promise<PhoneVerificationInterface> => {
  const find = await model.phoneVerification.findOne({ phoneNumber, code });
  if (!find) return Promise.reject({ status: 404, message: t('message.codeNotVerified') });
  return find;
};

export const deleteCode = async (phoneNumber: number, code: number): Promise<void> => {
  await model.phoneVerification.deleteOne({ phoneNumber, code });
};
