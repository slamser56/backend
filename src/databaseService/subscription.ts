import model from '../models';
import { SubscriptionInterface } from '../models/subscription';
import constantModels from '../models/constantModels';
import t from '../lang/index';

export const createOrUpdateSubscribe = async (userId: string, userIdSubscription: string): Promise<void> => {
  await model.subscription.updateOne({ userId, userIdSubscription }, { userId, userIdSubscription }, { upsert: true });
};

export const deleteSubscribe = async (userId: string, userIdSubscription: string): Promise<void> => {
  await model.subscription.deleteOne({ userId, userIdSubscription });
};

export const findSubscribes = async (userId: string): Promise<SubscriptionInterface[]> => {
  const find = await model.subscription.find({ userId }).populate(constantModels.ID_USER_SUBSCRIPTION);
  if (!find) {
    return Promise.reject({ status: 404, message: t('message.subscribeNotFound') });
  }
  return find;
};