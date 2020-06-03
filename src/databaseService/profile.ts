import model from '../models';

export const updateAvatar = async (avatar: string, idUser: string): Promise<void> => {
  await model.user.updateOne({ _id: idUser }, { avatar });
};

export const readAvatar = async (idUser: string): Promise<string> => {
  const { avatar } = await model.user.findById(idUser);
  return avatar;
};
