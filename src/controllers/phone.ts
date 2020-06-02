import express from 'express';
import jwt from 'jsonwebtoken';
import * as logger from '../utils/logger';
import { createCode, findCode, deleteCode } from '../databaseService/phone';
import createOrUpdatePhoneNumber from '../databaseService/user';
import getExpiredTime from '../utils/expiredTime';
import getGeneratedCode from '../utils/codeGenerator';
import smsMessage from '../utils/teleSign';

class PhoneController {
  sendCode = async ({ body: { phoneNumber } }: express.Request, res: express.Response): Promise<void> => {
    try {
      const code = getGeneratedCode();
      await createCode(phoneNumber, code);
      smsMessage(phoneNumber, code);
      res.status(200).send();
    } catch (error) {
      logger.error(error);
      res.status(500).send();
    }
  };

  verifyCode = async ({ body: { phoneNumber, code } }: express.Request, res: express.Response): Promise<void> => {
    try {
      const find = await findCode(phoneNumber, code);
      if (!find) {
        res.status(404).send();
        return;
      }
      await deleteCode(phoneNumber, code);
      const idUser = await createOrUpdatePhoneNumber(phoneNumber);
      const token = jwt.sign({ getExpiredTime, phoneNumber, idUser }, process.env.SECRET);
      res.status(200).json({ token });
    } catch (error) {
      logger.error(error);
      res.status(500).send();
    }
  };

  verifyToken = async ({ body: { token } }: express.Request, res: express.Response): Promise<void> => {
    try {
      jwt.verify(token, process.env.SECRET);
      res.status(200).send();
    } catch (error) {
      res.status(401).send();
    }
  };
}

export default PhoneController;
