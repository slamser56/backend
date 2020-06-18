import model from '../models';
import { UserInterface } from '../models/subscription';
import t from '../lang/index';

interface FindSubscribesInterface {
  phoneNumber: number;
  isDeleted: boolean;
  userId: string;
}

export const createOrUpdateSubscribe = async (subscriberId: string, userId: string): Promise<void> => {
  const find = await model.subscription.findOne({ subscriber: subscriberId, user: userId });
  if (!find) {
    await model.subscription.create({ subscriber: subscriberId, user: userId });
  } else {
    await model.subscription.updateOne({ subscriber: subscriberId, user: userId }, { isDeleted: false });
  }
};

export const deleteSubscribe = async (subscriberId: string, userId: string): Promise<void> => {
  await model.subscription.updateOne(
    { user: userId, subscriber: subscriberId },
    { isDeleted: true, deletedAt: new Date() },
  );
};

export const findSubscribes = async (userId: string): Promise<FindSubscribesInterface[]> => {
  const find = await model.subscription.find({ subscriber: userId, isDeleted: false }).populate('user');
  if (find.length === 0) return Promise.reject({ status: 404, message: t('message.subscribeNotFound') });
  const subscibes = find.map((subscription: UserInterface) => ({
    phoneNumber: subscription.user.phoneNumber,
    isDeleted: subscription.user.isDeleted,
    userId: subscription.user._id,
  }));
  return subscibes;
};
