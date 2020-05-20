import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import model from '../model';
import getCode from '../utils/codeGenerator';
import * as logger from '../utils/logger';

const TeleSignSDK = require('telesignsdk');

dotenv.config();

const expDate = Math.floor(Date.now() / 1000) + 60 * 60 * 24;

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

class PhoneController {
  sendCode = async ({ body: { phoneNumber } }: express.Request, res: express.Response): Promise<express.Response> => {
    const code = getCode();
    try {
      client.sms.message(messageCallback, phoneNumber, `Code: ${code}`, 'ARN');
      const update = await model.phoneVerification.updateOne({ phoneNumber }, { phoneNumber, code }, { upsert: true });
      if (!update) {
        return res.status(500).send();
      }
      return res.status(200).send();
    } catch (err) {
      return res.status(500).send();
    }
  };

  codeVerify = async (
    { body: { phoneNumber, code } }: express.Request,
    res: express.Response,
  ): Promise<express.Response> => {
    try {
      const find = await model.phoneVerification.findOne({
        phoneNumber,
        code,
      });
      if (!find) {
        return res.status(404).send();
      }
      await model.phoneVerification.deleteOne({ phoneNumber, code });
      await model.user.updateOne({ phoneNumber }, { phoneNumber }, { upsert: true });
      const { _id } = await model.user.findOne({ phoneNumber });
      if (!_id) {
        return res.status(500).send();
      }
      const token = jwt.sign({ exp: expDate, phoneNumber, _id }, process.env.SECRET);
      return res.status(200).json({ token });
    } catch (err) {
      return res.status(500).send();
    }
  };

  verifyToken = async ({ body: { token } }: express.Request, res: express.Response): Promise<express.Response> => {
    try {
      await jwt.verify(token, process.env.SECRET);
      return res.status(200).send();
    } catch (err) {
      return res.status(401).send();
    }
  };
}

export default PhoneController;
