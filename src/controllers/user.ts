import express from 'express';
import * as logger from '../utils/logger';
import { findUsers } from '../databaseService/user';
import t from '../lang/index';

class UserController {
  getUsers = async ({ body: { phoneNumber } }: express.Request, res: express.Response): Promise<void> => {
    try {
      const users = await findUsers(phoneNumber);
      res.status(200).json(users);
    } catch (error) {
      logger.error(error);
      res.status(error?.status ?? 500).send(error?.message ?? t('message.somethingWrong'));
    }
  };
}

export default UserController;