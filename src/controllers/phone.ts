import express from 'express';
import jwt from 'jsonwebtoken';
import * as logger from '../utils/logger';
import { setCode, findCode, deleteCode } from '../databaseService/phone';
import { setUser } from '../databaseService/user';
import getExpiredTime from '../utils/expiredTime';
import getGeneratedCode from '../utils/codeGenerator';
import smsMessage from '../utils/teleSign';

class PhoneController {
  sendCode = async ({ body: { phoneNumber } }: express.Request, res: express.Response): Promise<void> => {
    try {
      const code = getGeneratedCode();
      await setCode(phoneNumber, code);
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
      if (!find) throw { status: 404 };
      await deleteCode(phoneNumber, code);
      const idUser = await setUser(phoneNumber);
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
