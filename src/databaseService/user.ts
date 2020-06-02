import model from '../models';

const createOrUpdatePhoneNumber = async (phoneNumber: number): Promise<string> => {
  const { _id } = await model.user.findOneAndUpdate({ phoneNumber }, { phoneNumber }, { upsert: true, new: true });
  return _id;
};

export default createOrUpdatePhoneNumber;
