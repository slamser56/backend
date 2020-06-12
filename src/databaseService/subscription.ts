import model from '../models';
import { SubscriptionInterface } from '../models/subscription';
import constantModels from '../models/constantModels';
import t from '../lang/index';

export const createOrUpdateSubscribe = async (idUser: string, idUserSubscription: string): Promise<void> => {
  await model.subscription.updateOne({ idUser, idUserSubscription }, { idUser, idUserSubscription }, { upsert: true });
};

export const deleteSubscribe = async (idUser: string, idUserSubscription: string): Promise<void> => {
  await model.subscription.deleteOne({ idUser, idUserSubscription });
};

export const findSubscribes = async (idUser: string): Promise<SubscriptionInterface[]> => {
  const find = await model.subscription.find({ idUser }).populate(constantModels.ID_USER_SUBSCRIPTION);
  if (!find) {
    return Promise.reject({ status: 404, message: t('message.subscribeNotFound') });
  }
  return find;
};
