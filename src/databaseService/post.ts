import model from '../models';
import { PostInterface } from '../models/post';
import t from '../lang/index';

export const createPost = async (userId: string, text: string): Promise<PostInterface> => {
  const { _id } = await model.postText.create({text});
  const create = await model.post.create({ userId, postTextId: _id });
  return create;
};

export const findPosts = async (userId: string): Promise<PostInterface[]> => {
  const find = await model.post.find({ userId }, null, { sort: { date: -1 } });
  if (!find) {
    return Promise.reject({ status: 404, message: t('message.postsNotFound') });
  }
  return find;
};

export const deletePost = async (userId: string, _id: string): Promise<void> => {
  await model.post.deleteOne({ userId, _id });
};
