import model from '../models';
import { UserInterface } from '../models/user';

export const createUser = async (phoneNumber: number, password: string): Promise<UserInterface> => {
  const create = await model.user.create({ phoneNumber, password });
  return create;
};

export const findPhoneNumber = async (phoneNumber: number): Promise<UserInterface> => {
  const find = await model.user.findOne({ phoneNumber });
  return find;
};

export const findUsers = async (phoneNumber: number): Promise<UserInterface[]> => {
  const find = await model.user
    .find({ phoneNumber: { $gte: phoneNumber }, isDeleted: false })
    .select({ phoneNumber: 1, createdAt: 1 });
  return find;
};
