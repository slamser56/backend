import express from 'express';
import * as logger from '../utils/logger';
import { createOrUpdateSubscribe, deleteSubscribe, findSubscribes } from '../databaseService/subscription';
import t from '../lang/index';
import { validateId } from '../utils/validations';

class SubscriptionController {
  subscribe = async ({ body: { userId, anotherUserId } }: express.Request, res: express.Response): Promise<void> => {
    try {
      if (!validateId(anotherUserId)) throw { status: 400, message: t('message.badId') };
      await createOrUpdateSubscribe(userId, anotherUserId);
      res.status(201).send();
    } catch (error) {
      logger.error(error);
      res.status(error?.status ?? 500).send(error?.message ?? t('message.somethingWrong'));
    }
  };

  unsubscribe = async ({ body: { userId, anotherUserId } }: express.Request, res: express.Response): Promise<void> => {
    try {
      if (!validateId(anotherUserId)) throw { status: 400, message: t('message.badId') };
      await deleteSubscribe(userId, anotherUserId);
      res.status(200).send();
    } catch (error) {
      logger.error(error);
      res.status(error?.status ?? 500).send(error?.message ?? t('message.somethingWrong'));
    }
  };

  getSubscribe = async ({ body: { userId } }: express.Request, res: express.Response): Promise<void> => {
    try {
      const subscibes = await findSubscribes(userId);
      res.status(200).json(subscibes);
    } catch (error) {
      logger.error(error);
      res.status(error?.status ?? 500).send(error?.message ?? t('message.somethingWrong'));
    }
  };
}

export default SubscriptionController;
