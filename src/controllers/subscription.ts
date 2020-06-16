import express from 'express';
import * as logger from '../utils/logger';
import { createOrUpdateSubscribe, deleteSubscribe, findSubscribes } from '../databaseService/subscription';
import t from '../lang/index';
import { validateId } from '../utils/validations';

class SubscriptionController {
  subscribe = async (
    { body: { userId, userIdSubscription } }: express.Request,
    res: express.Response,
  ): Promise<void> => {
    try {
      validateId(userIdSubscription);
      await createOrUpdateSubscribe(userId, userIdSubscription);
      res.status(201).send();
    } catch (error) {
      logger.error(error);
      res.status(error?.status ?? 500).send(error?.message ?? t('message.somethingWrong'));
    }
  };

  unsubscribe = async (
    { body: { userId, userIdSubscription } }: express.Request,
    res: express.Response,
  ): Promise<void> => {
    try {
      validateId(userIdSubscription);
      await deleteSubscribe(userId, userIdSubscription);
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
