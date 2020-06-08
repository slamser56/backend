import model from '../models';
import { PostInterface } from '../models/post';

export const createPost = async (idUser: string, text: string): Promise<void> => {
  await model.post.create({ idUser, text, date: Date() });
};

export const findPosts = async (idUser: string): Promise<PostInterface[]> => {
  const find = await model.post.find({ idUser });
  return find;
};
