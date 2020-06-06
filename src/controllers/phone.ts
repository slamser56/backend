import express from 'express';
import jwt from 'jsonwebtoken';
import * as logger from '../utils/logger';
import { createOrUpdateCode, findCode, deleteCode } from '../databaseService/phone';
import { findOrCreatePhoneNumber } from '../databaseService/user';
import getExpiredTime from '../utils/expiredTime';
import getGeneratedCode from '../utils/codeGenerator';
import sendSmsMessage from '../utils/teleSign';

class PhoneController {
  sendCode = async ({ body: { phoneNumber } }: express.Request, res: express.Response): Promise<void> => {
    try {
      const code = getGeneratedCode();
      await createOrUpdateCode(phoneNumber, code);
      sendSmsMessage(phoneNumber, code);
      res.status(200).send();
    } catch (error) {
      logger.error(error);
      res.status(500).send();
    }
  };

  verifyCode = async ({ body: { phoneNumber, code } }: express.Request, res: express.Response): Promise<void> => {
    try {
      const foundCode = await findCode(phoneNumber, code);
      if (!foundCode) {
        res.status(404).send('Сode not verified');
        return;
      }
      await deleteCode(phoneNumber, code);
      const idUser = await findOrCreatePhoneNumber(phoneNumber);
      const token = jwt.sign({ exp: getExpiredTime(), phoneNumber, idUser }, process.env.SECRET);
      res.status(200).json({ token });
    } catch (error) {
      logger.error(error);
      res.status(500).send();
    }
  };
}

export default PhoneController;
