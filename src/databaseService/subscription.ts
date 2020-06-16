import mongoose from 'mongoose';
import model from '../models';
import { SubscriptionInterface } from '../models/subscription';
import t from '../lang/index';

export const createOrUpdateSubscribe = async (userId: string, userIdSubscription: string): Promise<void> => {
  await model.subscription.updateOne({ userId, userIdSubscription }, { userId, userIdSubscription }, { upsert: true });
};

export const deleteSubscribe = async (userId: string, userIdSubscription: string): Promise<void> => {
  await model.subscription.updateOne({ userId, userIdSubscription }, { deleted: true });
};

export const findSubscribes = async (userId: string): Promise<SubscriptionInterface[]> => {
  const find = await model.subscription.aggregate([
    { $match: { userId: mongoose.Types.ObjectId(userId) } },
    { $lookup: { from: 'users', localField: 'userIdSubscription', foreignField: '_id', as: 'user' } },
    { $unwind: '$user' },
    { $project: { createdAt: 1, _id: 1, phoneNumber: '$user.phoneNumber' } },
  ]);
  if (find.length === 0) {
    return Promise.reject({ status: 404, message: t('message.subscribeNotFound') });
  }
  return find;
};
