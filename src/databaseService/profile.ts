import model from '../models';
import { UserInterface } from '../models/user';

export const updateAvatar = async (avatar: string, userId: string): Promise<void> => {
  await model.user.updateOne({ _id: userId }, { avatar });
};

export const findUser = async (userId: string): Promise<UserInterface> => {
  const find = await model.user.findById(userId).select({ avatar: 1, phoneNumber: 1, isDeleted: 1 });
  return find;
};
