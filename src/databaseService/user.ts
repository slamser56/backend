import model from '../models';

export const findOrCreatePhoneNumber = async (phoneNumber: number): Promise<string> => {
  const find = await model.user.findOne({ phoneNumber });
  if (find) return find._id;
  const { _id } = await model.user.create({ phoneNumber });
  return _id;
};

export const findPhoneNumber = async (idUser: string): Promise<number> => {
  const { phoneNumber } = await model.user.findById(idUser);
  return phoneNumber;
};
