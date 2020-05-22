import model from '../models';

export const setUser = async (phoneNumber: number): Promise<string> => {
  try {
    const { _id } = await model.user.findOneAndUpdate({ phoneNumber }, { phoneNumber }, { upsert: true, new: true });
    return _id;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const findUser = async (phoneNumber: number): Promise<string> => {
  try {
    const { _id } = await model.user.findOne({ phoneNumber });
    return _id;
  } catch (error) {
    return Promise.reject(error);
  }
};
