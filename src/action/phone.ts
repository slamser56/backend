import jwt from 'jsonwebtoken';
import model from '../model';
import getCode from '../utils/codeGenerator';
import * as logger from '../utils/logger';

const TeleSignSDK = require('telesignsdk');

const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24;

const client = new TeleSignSDK(
  process.env.customerId,
  process.env.apiKey,
  process.env.rest_endpont,
  process.env.TeleSignTimeout,
);
function messageCallback(err: string, reply: string): void {
  if (err) {
    logger.info("Error: Could not reach TeleSign's servers");
  } else {
    logger.info('YAY!, the SMS message is being sent now by TeleSign!');
  }
}

export const sendCode = async (phoneNumber: number): Promise<string | number | void> => {
  const code = getCode();
  try {
    client.sms.message(messageCallback, phoneNumber, `Code: ${code}`, 'ARN');
    const update = await model.phoneVerification.updateOne({ phoneNumber }, { phoneNumber, code }, { upsert: true });
    if (!update) {
      return Promise.reject({ status: 500 });
    }
    return Promise.resolve();
  } catch (err) {
    return Promise.reject(err);
  }
};

export const codeVerify = async (phoneNumber: number, code: number): Promise<string | number> => {
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
