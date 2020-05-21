import dotenv from 'dotenv';
import model from '../models';
import cloudinary from '../utils/cloudinary';

dotenv.config();

export const setAvatar = async (image: string, idUser: string): Promise<string | void> => {
  try {
    const result = await cloudinary.uploader.upload(`data:image/jpeg;base64,${image}`);
    await model.user.updateOne({ _id: idUser }, { avatar: result.url });
    return Promise.resolve(result.url);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getAvatar = async (idUser: string): Promise<string> => {
  try {
    const { avatar } = await model.user.findOne({
      _id: idUser,
    });
    if (avatar) {
      return Promise.resolve(avatar);
    }
    return Promise.reject({ status: 404 });
  } catch (err) {
    return Promise.reject(err);
  }
};
