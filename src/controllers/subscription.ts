import express from 'express';
import * as logger from '../utils/logger';
import { createOrUpdateSubscribe, deleteSubscribe, findSubscribes } from '../databaseService/subscription';
import t from '../lang/index';
import { checkId } from '../utils/validations';
import { UserSubscriptionInterface } from '../models/subscription';

class SubscriptionController {
  subscribe = async (
    { body: { userId, userIdSubscription } }: express.Request,
    res: express.Response,
  ): Promise<void> => {
    try {
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
      if (!checkId(userIdSubscription)) {
        res.status(400).send(t('message.badId'));
        return;
      }
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
      res.status(200).json({
        data: subscibes.map((value: UserSubscriptionInterface) => ({
          phoneNumber: value.idUserSubscription.phoneNumber,
          id: value.idUserSubscription.id,
        })),
      });
    } catch (error) {
      logger.error(error);
      res.status(error?.status ?? 500).send(error?.message ?? t('message.somethingWrong'));
    }
  };
}

export default SubscriptionController;
