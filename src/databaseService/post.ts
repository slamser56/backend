import model from '../models';
import { PostInterface } from '../models/post';
import t from '../lang/index';

export const createPost = async (idUser: string, text: string): Promise<void> => {
  await model.post.create({ idUser, text, date: Date() });
};

export const findPosts = async (idUser: string): Promise<PostInterface[]> => {
  const find = await model.post.find({ idUser });
  if (!find) {
    return Promise.reject({ status: 404, message: t('message.postsNotFound') });
  }
  return find;
};
