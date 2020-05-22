import model from '../models';

export const setAvatar = async (avatar: string, idUser: string): Promise<void> => {
  try {
    await model.user.updateOne({ _id: idUser }, { avatar });
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAvatar = async (idUser: string): Promise<string> => {
  try {
    const { avatar } = await model.user.findOne({
      _id: idUser,
    });
    return avatar;
  } catch (error) {
    return Promise.reject(error);
  }
};
