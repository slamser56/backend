import express from 'express';
import { sign } from 'jsonwebtoken';
import { get } from 'lodash';
import * as logger from '../utils/logger';
import { createOrUpdateCode, findCode, deleteCode } from '../databaseService/phone';
import { findOrCreatePhoneNumber } from '../databaseService/user';
import getExpiredTime from '../utils/expiredTime';
import getGeneratedCode from '../utils/codeGenerator';
import sendSmsMessage from '../utils/teleSign';
import { t } from '../lang';

class PhoneController {
  sendCode = async ({ body: { phoneNumber } }: express.Request, res: express.Response): Promise<void> => {
    try {
      if (!/^(\+?\d{12})/.exec(phoneNumber)) {
        res.status(400).send(t('message.inputCorrectCode'));
      }
      const code = getGeneratedCode();
      await createOrUpdateCode(phoneNumber, code);
      sendSmsMessage(phoneNumber, code);
      res.status(200).send();
    } catch (error) {
      logger.error(error);
      get(error, 'status')
        ? res.status(error.status).send(error.message)
        : res.status(500).send(t('message.somethingWrong'));
    }
  };

  verifyCode = async ({ body: { phoneNumber, code } }: express.Request, res: express.Response): Promise<void> => {
    try {
      await findCode(phoneNumber, code);
      await deleteCode(phoneNumber, code);
      const idUser = await findOrCreatePhoneNumber(phoneNumber);
      const token = sign({ exp: getExpiredTime(), phoneNumber, idUser }, process.env.SECRET);
      res.status(200).json({ token });
    } catch (error) {
      logger.error(error);
      get(error, 'status')
        ? res.status(error.status).send(error.message)
        : res.status(500).send(t('message.somethingWrong'));
    }
  };
}

export default PhoneController;
