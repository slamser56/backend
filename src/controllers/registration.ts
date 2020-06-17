import express from 'express';
import { sign } from 'jsonwebtoken';
import * as logger from '../utils/logger';
import { createOrUpdateCode, findCode, deleteCode } from '../databaseService/registration';
import { createUser, findPhoneNumber } from '../databaseService/user';
import getExpiredTime from '../utils/expiredTime';
import getGeneratedCode from '../utils/codeGenerator';
import sendSmsMessage from '../utils/teleSign';
import { validatePhoneNumber, validatePassword } from '../utils/validations';
import { encryptPassword, checkPassword } from '../utils/encrypt';
import t from '../lang/index';

class RegistrationController {
  sendCode = async ({ body: { phoneNumber } }: express.Request, res: express.Response): Promise<void> => {
    try {
      if (!validatePhoneNumber(phoneNumber)) throw { status: 400, message: t('message.inputCorrectPhoneNumber') };
      const phone = await findPhoneNumber(phoneNumber);
      if (phone) throw { status: 400, message: t('message.thisPhoneNumberIsRegistered') };
      const code = getGeneratedCode();
      await createOrUpdateCode(phoneNumber, code);
      sendSmsMessage(phoneNumber, code);
      res.status(200).send();
    } catch (error) {
      logger.error(error);
      res.status(error?.status ?? 500).send(error?.message ?? t('message.somethingWrong'));
    }
  };

  verifyCode = async (
    { body: { phoneNumber, code, password } }: express.Request,
    res: express.Response,
  ): Promise<void> => {
    try {
      if (!validatePassword(password)) throw { status: 400, message: t('message.inputCorrectPassword') };
      await findCode(phoneNumber, code);
      await deleteCode(phoneNumber, code);
      const encryptedPassword = await encryptPassword(password);
      const { _id } = await createUser(phoneNumber, encryptedPassword);
      const token = sign({ exp: getExpiredTime(), phoneNumber, userId: _id }, process.env.SECRET);
      res.status(200).json({ token });
    } catch (error) {
      logger.error(error);
      res.status(error?.status ?? 500).send(error?.message ?? t('message.somethingWrong'));
    }
  };

  logIn = async ({ body: { phoneNumber, password } }: express.Request, res: express.Response): Promise<void> => {
    try {
      const user = await findPhoneNumber(phoneNumber);
      if(user?.isDeleted) throw { status: 403, message: t('message.userIsDelete') };
      await checkPassword(password, user?.password);
      const token = sign({ exp: getExpiredTime(), phoneNumber, userId: user._id }, process.env.SECRET);
      res.status(200).json({ token });
    } catch (error) {
      logger.error(error);
      res.status(error?.status ?? 500).send(error?.message ?? t('message.somethingWrong'));
    }
  };
}

export default RegistrationController;
