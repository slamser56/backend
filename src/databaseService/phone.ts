import jwt from 'jsonwebtoken';
import model from '../models';
import getCode from '../utils/codeGenerator';
import smsMessage from '../utils/teleSign';

const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24;

export const setCode = async (phoneNumber: number): Promise<void> => {
  try {
    const code = getCode();
    smsMessage(phoneNumber, code);
    await model.phoneVerification.updateOne({ phoneNumber }, { phoneNumber, code }, { upsert: true });
    return Promise.resolve();
  } catch (err) {
    return Promise.reject(err);
  }
};

export const findCode = async (phoneNumber: number, code: number): Promise<string | number> => {
  try {
    const find = await model.phoneVerification.findOne({
      phoneNumber,
      code,
    });
    if (!find) {
      return Promise.reject({ status: 404 });
    }
    await model.phoneVerification.deleteOne({ phoneNumber, code });
    await model.user.updateOne({ phoneNumber }, { phoneNumber }, { upsert: true });
    const { _id } = await model.user.findOne({ phoneNumber });
    if (!_id) {
      return Promise.reject({ status: 500 });
    }
    const token = jwt.sign({ exp, phoneNumber, idUser: _id }, process.env.SECRET);
    return Promise.resolve(token);
  } catch (err) {
    return Promise.reject(err);
  }
};
